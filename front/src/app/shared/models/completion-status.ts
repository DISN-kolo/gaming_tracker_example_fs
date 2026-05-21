import { AbstractControl, ValidatorFn } from '@angular/forms';

export type CompletionStatus =
  | 'PlanToPlay'
  | 'BoughtButNotPlayed'
  | 'Playing'
  | 'Abandoned'
  | 'Completed';

export const COMPLETION_STATUSES: { value: CompletionStatus, label: string }[] = [
  { value: 'PlanToPlay', label: 'Plan to Play' },
  { value: 'BoughtButNotPlayed', label: 'Bought But Not Played' },
  { value: 'Playing', label: 'Playing' },
  { value: 'Abandoned', label: 'Abandoned' },
  { value: 'Completed', label: 'Completed' },
];

export function statusInList(statuses: { value: string }[]): ValidatorFn {
  return (control: AbstractControl) => {
    if (statuses.some(s => s.value === control.value)) {
      return null;
    }
    return { invalidStatus: true };
  };
}
