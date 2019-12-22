import React from 'react';

export interface AppProps {
  message: string;
}

export default (props: AppProps) => <div>{props.message}</div>;
