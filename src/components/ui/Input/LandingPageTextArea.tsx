import {
  CaretDown,
  Check,
  Globe,
  Microphone,
  Paperclip,
  Pause,
  Pencil,
} from '@phosphor-icons/react';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, buttonVariants } from '../Button/Button';
import { cn } from 'src/utils/tw.utils';
import { Divider } from '../Divider';
import { unwrapIcon } from '../Icon';
import { tagVariants } from '../Tag';
import { inputStyling } from './Input';
import { UseFormWatch, Controller, Control } from 'react-hook-form';
import { usePlgDisplayText } from 'src/customHooks/usePLGDisplayText';
import { extractDomain, isUrl } from 'src/utils/string';
import { Typography } from '../Typography';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import { IconButton } from '../Button';
import { SchemaType } from 'src/pages/GTMHome/page';
import { getDnsCheck } from 'src/data/api/campaignRecommendations.api';
import axios from 'axios';
import { useFeatureFlag } from 'src/customHooks/useFeatureFlag';
import { FeatureFlag } from 'src/providers/features';
import { GeneralToolTip as Tooltip } from 'src/components/ui/ToolTip';

function TagInput({
  expanded,
  setExpanded,
  disabled,
  className,
  input,
  errorMessage,
  onBlur,
}: {
  disabled?: boolean;
  className?: string;
  input: React.InputHTMLAttributes<HTMLInputElement>;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  errorMessage?: string;
  onBlur?: () => void;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (expanded) {
      const timeout = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [expanded]);

  return (
    <div className="flex flex-col gap-2xs w-full">
      <span
        aria-disabled={disabled}
        className={cn(
          tagVariants({ variant: 'outline' }),
          className,
          'border-none hover:border-none focus:border-none active:border-none hover:bg-surface',
          errorMessage && 'border-error text-error'
        )}
        onClick={() => setExpanded(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setExpanded(true);
          }
        }}
      >
        {unwrapIcon(expanded ? Pencil : Globe, 16)}
        {expanded ? (
          <input
            ref={inputRef}
            className={cn(
              'border-none outline-none ring-none focus:ring-0 hover:ring-0 w-[280px]',
              !expanded && 'placeholder:text-on-surface-variant'
            )}
            onBlur={() => {
              setExpanded(false);
              onBlur?.();
            }}
            {...input}
          />
        ) : (
          <>
            <Divider orientation="vertical" className="h-full mx-2xs" />
            {input.value ? (
              <span className={cn('truncate')}>{input.value}</span>
            ) : (
              <span className={cn('truncate')}>Your Company Website</span>
            )}
          </>
        )}
      </span>
      {errorMessage && (
        <Typography variant="label-small" className="text-error">
          {errorMessage}
        </Typography>
      )}
    </div>
  );
}

function ExpandButtonInput({
  expanded,
  setExpanded,
  disabled,
  className,
  input,
  errorMessage,
  onBlur,
}: {
  disabled?: boolean;
  className?: string;
  input: React.InputHTMLAttributes<HTMLInputElement>;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  errorMessage?: string;
  onBlur?: () => void;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (expanded) {
      const timeout = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [expanded]);

  return (
    <div className="flex flex-col gap-2xs w-full">
      <span
        aria-disabled={disabled}
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'bg-surface w-fit',
          className,
          'border-none hover:border-none focus:border-none active:border-none hover:bg-surface',
          errorMessage && 'border-error text-error'
        )}
        onClick={() => setExpanded(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setExpanded(true);
          }
        }}
      >
        {unwrapIcon(expanded ? Pencil : Globe, 24)}
        {expanded && (
          <input
            ref={inputRef}
            className={cn(
              'border-none outline-none ring-none focus:ring-0 hover:ring-0 w-[330px]',
              !expanded && 'placeholder:text-on-surface-variant'
            )}
            onBlur={() => {
              setExpanded(false);
              onBlur?.();
            }}
            {...input}
          />
        )}
      </span>
      {errorMessage && (
        <Typography variant="label-medium" className="text-error">
          {errorMessage}
        </Typography>
      )}
    </div>
  );
}

function WebsiteUrlInput({
  websiteUrl,
  setWebsiteUrl,
  expanded,
  setExpanded,
  errorMessage,
  onSubmit,
  onBlur,
  isMobile,
}: {
  websiteUrl: string;
  setWebsiteUrl: (websiteUrl: string) => void;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  errorMessage?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onBlur?: () => void;
  isMobile?: boolean;
}) {
  return isMobile ? (
    <ExpandButtonInput
      className="cursor-pointer"
      expanded={expanded || errorMessage != null}
      setExpanded={setExpanded}
      errorMessage={errorMessage}
      onBlur={onBlur}
      input={{
        value: websiteUrl,
        onChange: (e) => setWebsiteUrl(e.target.value),
        placeholder: 'Enter Your Company URL For 10X Better Results',
        onKeyDown: (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
          }
        },
      }}
    />
  ) : (
    <TagInput
      className="cursor-pointer"
      expanded={expanded}
      setExpanded={setExpanded}
      errorMessage={errorMessage}
      onBlur={onBlur}
      input={{
        value: websiteUrl,
        onChange: (e) => setWebsiteUrl(e.target.value),
        placeholder: 'Enter Your Company URL For 10x Better Results',
        onKeyDown: (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
          }
        },
      }}
    />
  );
}

function LandingPageTextarea({
  onSubmit,
  control,
  watch,
  isRecording,
  handleToggleRecording,
  isMobile,
}: {
  control: Control<SchemaType>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  watch: UseFormWatch<SchemaType>;
  isRecording: boolean;
  handleToggleRecording: () => void;
  isMobile?: boolean;
}) {
  const isAudioTranscriptionEnabled = useFeatureFlag(FeatureFlag.AUDIO_TRANSCRIBE_ENABLED, false);

  const { displayText } = usePlgDisplayText();
  const [expanded, setExpanded] = useState(false);
  const [urlError, setUrlError] = useState<string | undefined>();

  const validateUrl = useCallback(async () => {
    const url = watch('companyUrl') ?? '';

    if (!url) {
      setUrlError('Company URL is required');
      return false;
    }

    if (!isUrl(url)) {
      setUrlError('Website URL has to be provided in correct format');
      return false;
    }

    try {
      const extractedDomain = extractDomain(url);
      const isValidUrl = await getDnsCheck(axios)(extractedDomain);
      if (!isValidUrl) {
        setUrlError('We can’t reach that website. Please try another');
        return false;
      }
    } catch (error) {
      console.error(`error validateUrl: ${error}`);
    }

    setUrlError(undefined);
    return true;
  }, [watch]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = await validateUrl();
    if (isValid) {
      onSubmit(e);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    try {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        await handleFormSubmit(new Event('submit') as unknown as React.FormEvent<HTMLFormElement>);
      }
      if (e.key === 'Tab') {
        e.preventDefault();
        setExpanded(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleFormSubmit}>
        <div
          className={cn(
            inputStyling({ addPadding: false }),
            'relative  flex flex-col outline-none items-center gap-2xs rounded-[10px] pb-sm',
            isMobile
              ? 'border-none bg-[#E4EDEF] min-h-[600px]'
              : 'border border-[#E1E1E1] bg-surface/50'
          )}
        >
          <Controller
            name="target"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-2xs w-full">
                <textarea
                  autoFocus={isMobile}
                  {...field}
                  placeholder={displayText}
                  className={cn(
                    'resize-none',
                    'w-full cursor-auto border-none active:border-none ring-none focus:ring-0 hover:ring-0 outline-none',
                    'overflow-y-auto min-h-[100px]',
                    !isMobile ? 'max-h-[200px]' : 'min-h-[40vh]'
                  )}
                  style={
                    isMobile
                      ? {
                          fontSize: '38px',
                          fontStyle: 'normal',
                          fontWeight: 700,
                          lineHeight: '51px',
                          fontFamily: 'var(--font-satoshi)',
                        }
                      : undefined
                  }
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    // Auto-grow logic
                    e.target.style.height = 'auto';
                    const newHeight = Math.min(e.target.scrollHeight, 200); // Cap at max height
                    e.target.style.height = `${newHeight}px`;
                    field.onChange(e);
                  }}
                  onBlur={() => field.onBlur()}
                />
              </div>
            )}
          />

          <div
            className={cn(
              'flex justify-between w-full items-center',
              isMobile ? 'flex-col gap-md' : 'flex-row'
            )}
          >
            <Controller
              name="companyUrl"
              control={control}
              render={({ field }) => (
                <WebsiteUrlInput
                  websiteUrl={field.value ?? ''}
                  setWebsiteUrl={field.onChange}
                  expanded={expanded}
                  setExpanded={setExpanded}
                  errorMessage={urlError}
                  onSubmit={handleFormSubmit}
                  isMobile={isMobile}
                  onBlur={async () => {
                    field.onBlur();
                    await validateUrl();
                  }}
                />
              )}
            />
            <div
              className={cn(
                'flex justify-end w-full',
                isMobile ? 'flex-col gap-md items-end' : 'flex-row gap-sm items-center'
              )}
            >
              {!isMobile && (
                <div className="flex flex-row items-center gap-2xs">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="xs"
                        className="border-none text-on-surface-variant"
                        rightIcon={CaretDown}
                      >
                        GTM-1 Omni
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="px-0 pl-0 pr-0 w-fit">
                      <div className="flex flex-col gap-0">
                        <div
                          className={cn(
                            'flex flex-col gap-2xs hover:bg-surface-hover rounded-md p-sm',
                            'cursor-pointer',
                            'bg-selected text-on-selected hover:bg-selected-hover focus:bg-selected-active active:bg-selected-active disabled:bg-disabled disabled:text-on-disabled data-[disabled]:bg-disabled data-[disabled]:text-on-disabled'
                          )}
                        >
                          <Typography
                            variant="label-large-prominent"
                            className="text-on-surface flex flex-row gap-2xs"
                          >
                            GTM-1 Omni <Check size={16} />
                          </Typography>
                          <Typography
                            variant="label-medium"
                            className="text-on-surface-variant max-w-[200px]"
                          >
                            GTM-1 Omni has been trained on billions of data points from both public
                            and private sources, including performance data from over 40 million
                            sales interactions.
                          </Typography>
                        </div>
                        <div className="flex flex-col gap-2xs hover:bg-surface-hover rounded-md p-sm">
                          <Typography variant="label-large-prominent" className="text-on-surface">
                            GTM-1 Omni 2.0
                          </Typography>
                          <Typography
                            variant="label-medium"
                            className="text-on-surface-variant max-w-[200px]"
                          >
                            Coming Soon
                          </Typography>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <IconButton
                        variant="ghost"
                        size="sm"
                        icon={Paperclip}
                        aria-label="attachments"
                      />
                    </PopoverTrigger>
                    <PopoverContent className="py-xs w-fit px-sm">
                      <Typography variant="label-large-prominent" className="text-on-surface">
                        Attachments
                      </Typography>
                      <Typography variant="label-medium" className="text-on-surface-variant">
                        Coming Soon
                      </Typography>
                    </PopoverContent>
                  </Popover>
                  {isAudioTranscriptionEnabled ? (
                    <Tooltip title="No need to type, just dictate what you want with a voice message">
                      <div>
                        <IconButton
                          variant="ghost"
                          size="sm"
                          icon={isRecording ? Pause : Microphone}
                          aria-label="voice input"
                          onClick={handleToggleRecording}
                          className={cn(isRecording && 'text-error')}
                        />
                      </div>
                    </Tooltip>
                  ) : (
                    <Popover>
                      <PopoverTrigger asChild>
                        <IconButton
                          variant="ghost"
                          size="sm"
                          icon={Microphone}
                          aria-label="voice input"
                        />
                      </PopoverTrigger>
                      <PopoverContent className="py-xs w-fit px-sm">
                        <Typography variant="label-large-prominent" className="text-on-surface">
                          Voice Input
                        </Typography>
                        <Typography variant="label-medium" className="text-on-surface-variant">
                          Coming Soon
                        </Typography>
                      </PopoverContent>
                    </Popover>
                  )}
                </div>
              )}
              <Button
                type="submit"
                size={isMobile ? 'md' : 'sm'}
                aria-label="submit"
                variant="primary"
                className="!rounded-[8px] px-sm"
                disabled={!watch('target') || urlError != null}
              >
                Go To Market
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function MobileLandingPageTextarea({
  onSubmit,
  control,
}: {
  control: Control<SchemaType>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  watch: UseFormWatch<SchemaType>;
}) {
  const { displayText } = usePlgDisplayText();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    try {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        await handleFormSubmit(new Event('submit') as unknown as React.FormEvent<HTMLFormElement>);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleFormSubmit}>
        <div
          className={cn(
            inputStyling({ addPadding: false }),
            'relative bg-surface/50 border border-gray-200 flex flex-col outline-none items-center gap-2xs rounded-[10px] pb-sm'
          )}
        >
          <Controller
            name="target"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                placeholder={displayText}
                className={cn(
                  'resize-none',
                  'w-full cursor-auto border-none active:border-none ring-none focus:ring-0 hover:ring-0 outline-none',
                  'h-[50px] overflow-y-auto min-h-[50px]'
                )}
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  // Auto-grow logic
                  e.target.style.height = 'auto';
                  const newHeight = Math.min(e.target.scrollHeight, 200); // Cap at max height
                  e.target.style.height = `${newHeight}px`;
                  field.onChange(e);
                }}
                onBlur={() => field.onBlur()}
              />
            )}
          />

          <div className="flex flex-row justify-between w-full items-center">
            <div className="flex flex-row justify-end w-full items-center gap-sm">
              <div className="flex flex-row items-center gap-2xs">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="xs"
                      className="border-none text-on-surface-variant"
                      rightIcon={CaretDown}
                    >
                      GTM-1 Omni
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="px-0 pl-0 pr-0 w-fit">
                    <div className="flex flex-col gap-0">
                      <div
                        className={cn(
                          'flex flex-col gap-2xs hover:bg-surface-hover rounded-md p-sm',
                          'cursor-pointer',
                          'bg-selected text-on-selected hover:bg-selected-hover focus:bg-selected-active active:bg-selected-active disabled:bg-disabled disabled:text-on-disabled data-[disabled]:bg-disabled data-[disabled]:text-on-disabled'
                        )}
                      >
                        <Typography
                          variant="label-large-prominent"
                          className="text-on-surface flex flex-row gap-2xs"
                        >
                          GTM-1 Omni <Check size={16} />
                        </Typography>
                        <Typography
                          variant="label-medium"
                          className="text-on-surface-variant max-w-[200px]"
                        >
                          GTM-1 Omni has been trained on billions of data points from both public
                          and private sources, including performance data from over 40 million sales
                          interactions.
                        </Typography>
                      </div>
                      <div className="flex flex-col gap-2xs hover:bg-surface-hover rounded-md p-sm">
                        <Typography variant="label-large-prominent" className="text-on-surface">
                          GTM-1 Omni 2.0
                        </Typography>
                        <Typography
                          variant="label-medium"
                          className="text-on-surface-variant max-w-[200px]"
                        >
                          Coming Soon
                        </Typography>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

LandingPageTextarea.displayName = 'LandingPageTextarea';

export { LandingPageTextarea, MobileLandingPageTextarea };
