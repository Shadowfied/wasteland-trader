import { cities } from '@/data/cities';
import { Button, Text, Title } from '@mantine/core';

interface ICitySelectorProps {
  onChange: (city: cities) => void;
}

export const CitySelector = ({ onChange }: ICitySelectorProps) => {
  // Get an array of all city keys from the enum
  const cityKeys = Object.keys(cities) as (keyof typeof cities)[];

  return (
    <>
      <Text size="lg" mb="md">
        Select a city to move to
      </Text>

      {/* Map over the city keys and generate a button for each city */}
      {cityKeys.map((cityKey) => (
        <Button key={cityKey} mb="md" fullWidth onClick={() => onChange(cities[cityKey])}>
          {cities[cityKey]}
        </Button>
      ))}
    </>
  );
};
