import * as React from 'react';
export default class CalendarEvents extends React.Component<any> {
    constructor(props: any);
    componentDidMount(): void;
    handleUrlPress(matchingString: string, matchIndex: number): void;
    handleAppSettings(): void;
    renderStyles(matchingString: string, matches: string[]): string;
    renderThreeStyles(matchingString: string, matches: string[]): string;
    render(): JSX.Element;
}
