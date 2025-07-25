import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Icon } from '@phosphor-icons/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';

export interface TabConfig {
  value: string;
  label: string;
  rightIcon?: React.ReactNode;
  leftIcon?: Icon;
  className?: string;
  panelComponent: React.ReactNode;
  hasBackground?: boolean;
}

interface GeneralTabsProps {
  value?: string;
  defaultValue?: string;
  tabConfigs: TabConfig[];
  vertical?: boolean;
  contentClassName?: string;
  className?: string;
  onTabChange?: (newValue: string) => void;
}

export const GeneralTabs = ({
  value,
  tabConfigs,
  vertical = false,
  onTabChange,
  defaultValue,
  contentClassName,
  className,
}: GeneralTabsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTab = searchParams.get('tab');

  const handleTabChange = (newValue: string) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set('tab', newValue);
    setSearchParams(updatedParams);
    onTabChange?.(newValue);
  };

  const tab = useMemo(() => {
    const firstValue = tabConfigs[0].value;
    return tabConfigs.find((t) => t.value === selectedTab)?.value || firstValue;
  }, [selectedTab, tabConfigs]);

  if (tabConfigs.length === 0) {
    throw new Error('tabConfigs is required');
  }

  return (
    <Tabs
      defaultValue={tab ?? defaultValue}
      value={value}
      onValueChange={handleTabChange}
      className={className}
    >
      <TabsList>
        {tabConfigs.map((trigger) => (
          <TabsTrigger key={trigger.value} {...trigger} vertical={vertical} />
        ))}
      </TabsList>
      {tabConfigs.map((trigger) => (
        <TabsContent key={trigger.value} value={trigger.value} className={contentClassName}>
          {trigger.panelComponent}
        </TabsContent>
      ))}
    </Tabs>
  );
};
