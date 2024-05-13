import { TDailyItem } from '@/types/types';
import { Button, Group, Text } from '@mantine/core';
import { useState } from 'react';

interface IBuyItemProps {
  caps: number;
  item: TDailyItem;
  onBuy: (quantityBought: number) => void;
}

const MAX_QUANTITY = 100;
const MIN_QUANTITY = 0;

export const BuyItem = ({ caps, item, onBuy }: IBuyItemProps) => {
  const [quantity, setQuantity] = useState(0);

  const decrement = () => setQuantity((prevQuantity) => Math.max(prevQuantity - 1, MIN_QUANTITY));
  const increment = () => setQuantity((prevQuantity) => Math.min(prevQuantity + 1, MAX_QUANTITY));
  const half = () => setQuantity(MAX_QUANTITY / 2);
  const max = () => setQuantity(Math.floor(caps / item.price));
  const buy = () => onBuy(quantity);

  return (
    <>
      <Text size="lg" mb="md">
        {item.name} - {item.price} caps
      </Text>

      <Group grow mb="lg">
        <Button variant="subtle" onClick={decrement} disabled={quantity === MIN_QUANTITY}>
          -
        </Button>
        <Text ta="center" fz="lg">
          {quantity}
        </Text>
        <Button variant="subtle" onClick={increment} disabled={quantity === MAX_QUANTITY}>
          +
        </Button>
      </Group>

      <Group grow>
        <Button variant="outline" onClick={half}>
          Half
        </Button>
        <Button onClick={buy}>Buy</Button>
        <Button variant="outline" onClick={max}>
          Max
        </Button>
      </Group>
    </>
  );
};
