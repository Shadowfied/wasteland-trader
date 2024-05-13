import {
  Accordion,
  Affix,
  Box,
  Button,
  Card,
  Group,
  Image,
  Progress,
  ScrollArea,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { items } from '@/data/items';
import { cities } from '../data/cities';
import capsIcon from '@/images/caps-icon.png';
import logo from '@/images/logo.png';
import { useImmer } from 'use-immer';
import { closeAllModals, modals } from '@mantine/modals';
import { CitySelector } from './CitySelector';
import { BuyItem } from './BuyItem';
import { IGameState, TDailyItem } from '@/types/types';
import { getDailyItems } from '@/logic/items';
import { HEALTH_BAR_HEIGHT, HEALTH_CURE_COST, HEALTH_FULL, MAX_DAYS } from '@/config/config';
import { progressDay } from '@/logic/day';
import { payDebt } from '@/logic/debt';
import { cureHealth } from '@/logic/health';
import { getInventorySlotsUsed } from '@/logic/inventory';
import { buyItem } from '@/logic/trading';

const initialGameState: IGameState = {
  day: 1,
  city: cities.DiamondCity,
  debt: 500,
  caps: 2000,
  inventory: items.map((item) => {
    return {
      name: item.name,
      paidPrice: 0,
      quantity: 0,
    };
  }),
  health: HEALTH_FULL,
  isGameOver: false,
  dailyItems: getDailyItems(items),
};

export const Game = () => {
  const [gameState, setGameState] = useImmer(initialGameState);
  const { caps, city, dailyItems, day, debt, health, inventory, isGameOver } = gameState;

  const handleNextDay = () => {
    modals.open({
      withCloseButton: false,
      children: (
        <>
          <CitySelector
            onChange={(city) => {
              progressDay({ gameState, setGameState, city });
              closeAllModals();
            }}
          />
        </>
      ),
    });
  };

  const handlePayDebt = () => {
    modals.openConfirmModal({
      children: <Text>Do you want to pay off your debt?</Text>,
      labels: {
        confirm: caps >= debt ? `Pay debt` : `Not enough caps`,
        cancel: 'Cancel',
      },
      onConfirm: () => {
        payDebt({ setGameState });
      },
      confirmProps: {
        disabled: caps < debt,
      },
      withCloseButton: false,
    });
  };

  const handleCureHealth = () => {
    modals.openConfirmModal({
      children: <Text>Cure your health for {HEALTH_CURE_COST} caps</Text>,
      labels: {
        confirm: caps >= HEALTH_CURE_COST ? `Cure Me` : `Not enough caps`,
        cancel: 'Cancel',
      },
      onConfirm: () => {
        cureHealth({ setGameState });
      },
      confirmProps: {
        disabled: caps < HEALTH_CURE_COST,
      },
      withCloseButton: false,
    });
  };

  const handleBuyItem = (item: TDailyItem) => {
    modals.open({
      children: (
        <BuyItem
          caps={caps}
          item={item}
          onBuy={(quantityBought) => {
            buyItem({ item, quantityBought, setGameState });
            closeAllModals();
          }}
        />
      ),
      withCloseButton: false,
    });
  };

  if (isGameOver)
    return (
      <Box maw={500} mx="auto">
        <Title>Game over</Title>
        <Button onClick={() => setGameState(initialGameState)}>Restart</Button>
      </Box>
    );

  return (
    <>
      <Box maw={500} mt="xl" mx="auto" mb={HEALTH_BAR_HEIGHT * 2}>
        <Image src={logo} mb="lg" h={60} fit="contain" />

        <Group justify="space-around" mb="lg" grow ta="center">
          <Title order={3}>
            Day {day}/{MAX_DAYS}
          </Title>
          <Title order={3}>{city}</Title>
        </Group>

        <Group justify="space-around" ta="center" mb="lg" grow>
          <Stack gap={0} ta="center" justify="center" align="center">
            <Text fz="lg">Debt</Text>
            <Text fz="lg">{debt}</Text>
          </Stack>

          <Stack gap={0}>
            <Text fz="lg">Caps</Text>
            <Text fz="lg">{caps}</Text>
          </Stack>

          <Stack gap={0}>
            <Text fz="lg">Inventory</Text>
            <Text fz="lg">{getInventorySlotsUsed({ inventory })}/100</Text>
          </Stack>
        </Group>

        <Group justify="space-around" mb="lg" grow>
          <Button onClick={handlePayDebt} variant="subtle">
            Pay debt
          </Button>
          <Button onClick={handleNextDay}>Next Day</Button>
          <Button onClick={handleCureHealth} variant="subtle">
            Cure Health
          </Button>
        </Group>

        <Affix position={{ bottom: 0 }} w={'100%'}>
          <Progress.Root size={100} h={HEALTH_BAR_HEIGHT}>
            <Progress.Section value={health}>
              <Progress.Label>HEALTH</Progress.Label>
            </Progress.Section>
          </Progress.Root>
        </Affix>

        <Card withBorder shadow="md">
          <ScrollArea h={300} offsetScrollbars>
            <Accordion variant="contained">
              {dailyItems.map((item) => (
                <Accordion.Item key={item.name} value={item.name}>
                  <Accordion.Control>
                    <Group justify="space-between" mr="md">
                      <Text>{item.name}</Text>
                      <Box>
                        <Group grow>
                          <Image w={24} src={capsIcon} />
                          <Text>{item.price}</Text>
                        </Group>
                      </Box>
                    </Group>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Group>
                      <Button onClick={() => handleBuyItem(item)}>Buy</Button>
                      <Button>Sell</Button>
                    </Group>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </ScrollArea>
        </Card>
      </Box>
    </>
  );
};
