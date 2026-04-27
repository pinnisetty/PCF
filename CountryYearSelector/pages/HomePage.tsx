import * as React from "react";
import {
  Dropdown,
  IDropdownOption,
  Text,
} from "@fluentui/react";

import {
  Globe24Regular,
  Person24Regular,
  People24Regular,
} from "@fluentui/react-icons";

import { HomePageProps, RoleType } from "../types/types";
import { COUNTRIES, YEARS, getRecordCount } from "../data/mockData";

// ─────────────────────────────────────────────
// PAGE WRAPPER
// ─────────────────────────────────────────────

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f5f7fb",
  padding: 24,
  fontFamily: "'Segoe UI', sans-serif",
};

const cardStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 520,
  background: "#ffffff",
  borderRadius: 16,
  padding: 28,
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column",
  gap: 18,
};

// ─────────────────────────────────────────────
// LABEL
// ─────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#6b7280",
  marginBottom: 6,
  width: "100%",
  textAlign: "left",
};

// ─────────────────────────────────────────────
// DROPDOWN STYLE (FIXED ARROW)
// ─────────────────────────────────────────────

const dropdownStyles = {
  root: {
    width: "100%",
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    paddingLeft: 8,
  },
  dropdownItem: {
    textAlign: "left",
  },
};

// ─────────────────────────────────────────────
// ROLE BUTTON
// ─────────────────────────────────────────────

interface RoleBtnProps {
  role: RoleType;
  count: number;
  onClick: () => void;
  disabled: boolean;
}

const RoleButton: React.FC<RoleBtnProps> = ({
  role,
  count,
  onClick,
  disabled,
}) => {
  const isManager = role === "manager";
  const label = isManager ? "Manager" : "Worker";
  const iconColor = disabled ? "#9ca3af" : "#16a34a";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: 18,
        borderRadius: 14,
        border: `1px solid ${disabled ? "#e5e7eb" : "#86efac"}`,
        background: disabled ? "#f9fafb" : "#f0fdf4",
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: "50%",
          background: disabled ? "#f3f4f6" : "#dcfce7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #86efac",
        }}
      >
        {isManager ? (
          <Person24Regular style={{ fontSize: 20, color: iconColor }} />
        ) : (
          <People24Regular style={{ fontSize: 20, color: iconColor }} />
        )}
      </div>

      <div style={{ fontWeight: 700, color: "#15803d" }}>{label}</div>

      <div
        style={{
          fontSize: 11,
          padding: "2px 10px",
          borderRadius: 20,
          border: "1px solid #86efac",
          background: "#dcfce7",
          color: "#15803d",
          fontWeight: 600,
        }}
      >
        {count} record{count !== 1 ? "s" : ""}
      </div>
    </button>
  );
};

// ─────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [selectedCountry, setSelectedCountry] = React.useState("US");
  const [selectedYear, setSelectedYear] = React.useState(2024);

  const countryOptions: IDropdownOption[] = COUNTRIES.map((c) => ({
    key: c.key,
    text: `${c.flag} ${c.text}`,
  }));

  const yearOptions: IDropdownOption[] = YEARS.map((y) => ({
    key: y.key,
    text: y.text,
  }));

  const managerCount = getRecordCount(selectedCountry, selectedYear, "manager");
  const workerCount = getRecordCount(selectedCountry, selectedYear, "worker");

  const noData = managerCount === 0 && workerCount === 0;

  const selectedCountryLabel =
    COUNTRIES.find((c) => c.key === selectedCountry)?.text ?? "";

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>

        {/* HEADER */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #16a34a, #15803d)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px",
            }}
          >
            <Globe24Regular style={{ fontSize: 26, color: "white" }} />
          </div>

          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>
            Workforce Map
          </h2>

          <p style={{ margin: "6px 0 0", color: "#6b7280", fontSize: 13 }}>
            Explore managers and workers by region
          </p>
        </div>

        {/* COUNTRY */}
        <div>
          <div style={labelStyle}>Country</div>
          <Dropdown
            selectedKey={selectedCountry}
            options={countryOptions}
            onChange={(_, opt) => setSelectedCountry(String(opt?.key))}
            styles={dropdownStyles}
          />
        </div>

        {/* YEAR */}
        <div>
          <div style={labelStyle}>Year</div>
          <Dropdown
            selectedKey={selectedYear}
            options={yearOptions}
            onChange={(_, opt) => setSelectedYear(Number(opt?.key))}
            styles={dropdownStyles}
          />
        </div>

        {/* ROLE SECTION */}
        <div>
          <div style={labelStyle}>View by role</div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <RoleButton
              role="manager"
              count={managerCount}
              onClick={() => onNavigate("manager", selectedCountry, selectedYear)}
              disabled={managerCount === 0}
            />

            <RoleButton
              role="worker"
              count={workerCount}
              onClick={() => onNavigate("worker", selectedCountry, selectedYear)}
              disabled={workerCount === 0}
            />
          </div>
        </div>

        {/* NO DATA */}
        {noData && (
          <Text styles={{ root: { color: "#ef4444", fontSize: 12 } }}>
            No data available for {selectedCountryLabel} in {selectedYear}
          </Text>
        )}
      </div>
    </div>
  );
};