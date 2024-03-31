import React, { useState } from 'react';

type Props = {
  children: React.ReactNode[];
};

type StepProps = {
  isVisited: boolean;
  children: React.ReactNode;
  onClick: () => void;
};
function Step({ children, isVisited, onClick }: StepProps) {
  return (
    <div
      onClick={onClick}
      className='roundedBox flex-center cursor-pointer'
      style={{
        backgroundColor: isVisited ? 'gray' : 'lightgray',
      }}
    >
      {children}
    </div>
  );
}
const START_STEP = 0;
function Stepper({ children }: Props) {
  const [currStep, setCurrStep] = useState(START_STEP);
  const totalChildren = React.Children.count(children);
  const steps = new Array(totalChildren).fill('');
  const prev = () => setCurrStep((s) => s - 1);
  const next = () => setCurrStep((s) => s + 1);
  const lastIndex = totalChildren - 1;
  const c = (100 / lastIndex) * currStep;
  return (
    <>
      <div className='flex justify-between'>
        <div className='position-relative w-full'>
          <div className='progress-line' style={{ width: `${c}%` }}></div>
          <div className='flex-center justify-between w-full'>
            {steps.map((_, index) => {
              return (
                <Step
                  key={index}
                  isVisited={index <= currStep}
                  onClick={() => setCurrStep(index)}
                >
                  {index + 1}
                </Step>
              );
            })}
          </div>
        </div>
      </div>
      <div className='flex-center my-2'>{children[currStep]}</div>
      <div className='flex-center my-2'>
        <button disabled={currStep === START_STEP} onClick={prev}>
          Prev
        </button>
        <button disabled={currStep === lastIndex} onClick={next}>
          Next
        </button>
      </div>
    </>
  );
}

export default Stepper;
