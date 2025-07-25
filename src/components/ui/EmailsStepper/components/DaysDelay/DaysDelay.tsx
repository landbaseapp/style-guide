import { Input } from 'src/components/ui/Input';
import { DotsThree } from '@phosphor-icons/react';
import { Typography } from 'src/components/ui/Typography';

interface DaysDelayProps {
  value?: number;
  onChange: (val: number) => void;
}

export const DaysDelay = ({ value = 3, onChange }: DaysDelayProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-sm">
        <DotsThree />
        <Input
          hideClearButton
          type="number"
          min={1}
          max={9}
          value={value}
          onChange={(e) => onChange(e.target.valueAsNumber || 3)}
        />
        <DotsThree />
      </div>
      <Typography variant="body-medium">days later</Typography>
    </div>
  );
};
