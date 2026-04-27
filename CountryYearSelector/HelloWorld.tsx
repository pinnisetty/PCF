import * as React from "react";
import { HomePage } from "./pages/HomePage";
import { RoleType } from "../CountryYearSelector/types/types";

export interface IHelloWorldProps {
  name?: string;
}

type View = "home" | "results";

interface AppState {
  view: View;
  role: RoleType;
  country: string;
  year: number;
}

export class HelloWorld extends React.Component<IHelloWorldProps, AppState> {
  constructor(props: IHelloWorldProps) {
    super(props);

    this.state = {
      view: "home",
      role: "manager",
      country: "US",
      year: 2024
    };
  }

  handleNavigate = (role: RoleType, country: string, year: number): void => {
    this.setState({
      view: "results",
      role,
      country,
      year
    });
  };

  handleBack = (): void => {
    this.setState((prev) => ({
      ...prev,
      view: "home"
    }));
  };

  public render(): React.ReactNode {
    const { view, role, country, year } = this.state;

    return (
      <div style={{ width: "100%", minHeight: "100vh", margin: 0, padding: 0 }}>
        {view === "home" ? (
          <HomePage onNavigate={this.handleNavigate} />
        ) : (
          <div>
            {/* Replace this with your actual ResultsPage component */}
            <h2>Results Page</h2>
            <p>Role: {role}</p>
            <p>Country: {country}</p>
            <p>Year: {year}</p>

            <button onClick={this.handleBack}>Back</button>
          </div>
        )}
      </div>
    );
  }
}