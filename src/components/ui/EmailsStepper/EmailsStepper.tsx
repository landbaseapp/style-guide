import { Fragment } from 'react';
import { Button } from '../Button';
import { ReactComponent as LineLeft } from 'src/assets/icons/lineLeft.svg';
import { ReactComponent as LineRight } from 'src/assets/icons/lineRight.svg';
import { DaysDelay } from './components/DaysDelay/DaysDelay';
import { StepCard } from './components/StepCard/StepCard';
import { Plus } from '@phosphor-icons/react';
import { EmailData } from 'src/components/EmailSteps/emailSteps.reducer';

interface EmailsStepperProps {
  steps: EmailData[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
  editControls?: {
    addStep: () => void;
    removeStep: (id: number) => void;
    editDelay: (id: number) => (value: number) => void;
    maxStepsCount: number;
    minStepsCount: number;
  };
}

export const EmailsStepper = ({
  steps,
  currentStep,
  setCurrentStep,
  editControls,
}: EmailsStepperProps) => {
  const isEditable = !!editControls;
  return (
    <div className="flex flex-row flex-wrap gap-sm items-center">
      {steps.map((step, index) => (
        <Fragment key={step.id}>
          {isEditable && index !== 0 && (
            <div className="flex justify-center mt-md">
              <DaysDelay value={step.daysDelay} onChange={editControls.editDelay(step.id)} />
            </div>
          )}
          {index !== 0 && !isEditable && (
            <div className="flex justify-center gap-xs">
              <LineLeft />
              <LineRight />
            </div>
          )}

          <StepCard
            onRemoveStep={
              isEditable
                ? steps.length !== editControls?.minStepsCount
                  ? () => editControls?.removeStep(step.id)
                  : undefined
                : undefined
            }
            stepNumber={index + 1}
            isActive={step.id === currentStep}
            onClick={() => setCurrentStep(step.id)}
            stepName={step.name}
          />
        </Fragment>
      ))}
      {isEditable && steps.length < editControls?.maxStepsCount && (
        <div className="flex justify-center items-center">
          <Button onClick={editControls.addStep} variant="outline" leftIcon={Plus}>
            Add step
          </Button>
        </div>
      )}
    </div>
  );
};
