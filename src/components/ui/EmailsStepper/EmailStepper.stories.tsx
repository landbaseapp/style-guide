import type { Meta, StoryObj } from '@storybook/react';
import { EmailsStepper } from './EmailsStepper';
import { useState } from 'react';
import { getCustomInitialState } from 'src/components/EmailSteps/emailSteps.reducer';
import { Checkbox } from '../Checkbox';

const meta: Meta<typeof EmailsStepper> = {
  title: 'Composite-UI/EmailsStepper',
  component: EmailsStepper,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof EmailsStepper>;

const mockSteps = [
  {
    id: 1,
    name: 'First Email',
    email: { subject: 'Subject 1', text: 'Email text 1' },
    plainText: false,
  },
  {
    id: 2,
    name: 'Second Email',
    daysDelay: 3,
    email: { subject: 'Subject 2', text: 'Email text 2' },
    plainText: false,
  },
  {
    id: 3,
    name: 'Third Email',
    daysDelay: 5,
    email: { subject: 'Subject 3', text: 'Email text 3' },
    plainText: false,
  },
];

export const Interactive: Story = {
  render: () => {
    const Example = () => {
      const [currentStep, setCurrentStep] = useState(1);
      const [isEditable, setIsEditable] = useState(false);
      const [stepsData, setStepsData] = useState(
        getCustomInitialState({
          plainText: true,
          emailsData: mockSteps,
        })
      );

      return (
        <div>
          <EmailsStepper
            steps={stepsData.data}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            editControls={
              isEditable
                ? {
                    addStep: () => {
                      setStepsData((prev) => ({
                        ...prev,
                        data: [
                          ...prev.data,
                          {
                            id: prev.data.length + 1,
                            name: `Email ${prev.data.length + 1}`,
                            email: {
                              subject: `Subject ${prev.data.length + 1}`,
                              text: `Email text ${prev.data.length + 1}`,
                            },
                            plainText: false,
                          },
                        ],
                      }));
                    },
                    removeStep: (id: number) => {
                      setStepsData((prev) => ({
                        ...prev,
                        data: prev.data.filter((step) => step.id !== id),
                      }));
                    },
                    editDelay: (id: number) => (daysDelay: number) => {
                      setStepsData((prev) => ({
                        ...prev,
                        data: prev.data.map((step) =>
                          step.id === id ? { ...step, daysDelay } : step
                        ),
                      }));
                    },
                    maxStepsCount: 9,
                    minStepsCount: 1,
                  }
                : undefined
            }
          />
          <div>Current step: {currentStep}</div>
          <div>{stepsData.data[currentStep - 1]?.email.subject}</div>
          <Checkbox
            checked={isEditable}
            onCheckedChange={() => setIsEditable(!isEditable)}
            label="Editable"
          />
        </div>
      );
    };
    return <Example />;
  },
};
