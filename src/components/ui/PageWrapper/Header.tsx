import { useState } from 'react';
import { ArrowCircleLeft, Icon, Pencil } from '@phosphor-icons/react';
import { Typography } from '../Typography/Typography';
import { unwrapIcon } from '../Icon/Icon';
import { Input } from '../Input';
import { cn } from 'src/utils/tw.utils';
import { Link } from '../Link';

interface EditableTitleProps {
  label: string;
  onEdit: (newLabel: string) => void;
  badge?: React.ReactNode;
}

export const EditableTitle = ({ label, badge, onEdit }: EditableTitleProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(label);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdateTitle = (newLabel: string) => {
    if (newLabel.length > 0) {
      setTitle(newLabel);
      setIsEditing(false);
      onEdit(newLabel);
    } else {
      setIsEditing(false);
    }
  };

  return (
    <div className="relative flex gap-sm items-center w-full truncate">
      {isEditing ? (
        <Input
          className={cn(
            'bg-transparent text-on-surface w-full focus:outline-none',
            // Bottom border only for underline effect
            'border-b border-b-outline-accent rounded-none',
            // Font Size: To override the default font size of the Input component
            'customtext-headline-medium !text-[28px]'
          )}
          spellCheck={false}
          autoFocus
          defaultValue={title}
          onBlur={(e) => handleUpdateTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleUpdateTitle(e.currentTarget.value)}
        />
      ) : (
        <div className="group flex items-center gap-sm w-full">
          <Typography
            variant="headline-medium"
            className="truncate border-b border-b-outline-variant cursor-pointer"
            onClick={handleEdit}
          >
            {title}
          </Typography>

          {/* Badge + Editable Icon (Switch on hover) */}
          {badge && !isEditing && (
            <div className="group relative flex-shrink-0 flex items-center">
              <span className="group-hover:hidden">{badge}</span>
              <span
                className="hidden group-hover:flex text-primary cursor-pointer"
                onClick={handleEdit}
              >
                {unwrapIcon(Pencil, 28)}
              </span>
            </div>
          )}

          {/* Editable Icon Only */}
          {!badge && !isEditing && (
            <span
              className="hidden group-hover:flex text-primary cursor-pointer flex-shrink-0"
              onClick={handleEdit}
            >
              {unwrapIcon(Pencil, 28)}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

interface NonEditableTitleProps {
  label: string;
  badge?: React.ReactNode;
}

export const NonEditableTitle = ({ label, badge }: NonEditableTitleProps) => {
  return (
    <div className="flex items-center gap-sm">
      <Typography variant="headline-medium" className="truncate max-w-full">
        {label}
      </Typography>
      {badge && <span className="flex-shrink-0">{badge}</span>}
    </div>
  );
};

export interface HeaderProps {
  label: string | React.ReactNode;
  description?: string | React.ReactNode;
  leftSection?: {
    leftIcon?: Icon;
    backLink?: {
      label: string;
      href: string;
      onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    };
    badge?: React.ReactNode;
  };
  onEdit?: (newLabel: string) => void;
  rightSection?: {
    mainAction?: React.ReactNode;
    secondaryAction?: React.ReactNode;
    label?: string;
  };
}

export const Header = ({ label, rightSection, leftSection, onEdit, description }: HeaderProps) => {
  const { leftIcon, backLink, badge } = leftSection ?? {};
  const { mainAction, secondaryAction, label: rightLabel } = rightSection ?? {};

  return (
    <div className="flex gap-2xs mb-lg justify-between w-full">
      <div className="flex flex-col justify-center max-w-[800px]">
        {backLink && (
          <Link
            className="flex items-center gap-2xs"
            to={backLink.href}
            size="lg"
            onClick={backLink?.onClick}
          >
            <ArrowCircleLeft size={18} />
            {backLink.label}
          </Link>
        )}
        <div className="flex items-center gap-sm w-full truncate">
          {leftIcon && (
            <span className="flex-shrink-0">{unwrapIcon(leftIcon, description ? 40 : 28)}</span>
          )}
          <div className="flex flex-col min-w-0">
            {typeof label === 'string' ? (
              <div className="flex-1 min-w-0">
                {onEdit ? (
                  <EditableTitle label={label} badge={badge} onEdit={onEdit} />
                ) : (
                  <NonEditableTitle label={label} badge={badge} />
                )}
              </div>
            ) : (
              label
            )}
            {description &&
              (typeof description === 'string' ? (
                <div className="text-on-surface-muted customtext-body-large">{description}</div>
              ) : (
                description
              ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-xs flex-shrink-0">
        {rightLabel && (
          <Typography className="text-on-surface-variant" variant="label-large">
            {rightLabel}
          </Typography>
        )}
        {secondaryAction}
        {mainAction}
      </div>
    </div>
  );
};
