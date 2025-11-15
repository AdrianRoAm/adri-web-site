export type WithChildren<T = unknown> = {
  children?: React.ReactNode | undefined;
} & T;
export type WithClassName<T = unknown> = { className?: string } & T;

export type WithViewBox<T = unknown> = { viewBox?: string } & T;
