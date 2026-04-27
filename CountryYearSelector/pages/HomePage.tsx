import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
  Chip
} from "@material-ui/core";

import PublicIcon from "@material-ui/icons/Public";
import PersonIcon from "@material-ui/icons/Person";
import EngineeringIcon from "@material-ui/icons/Build";

import { HomePageProps, RoleType } from "../types/types";
import { COUNTRIES, YEARS, getRecordCount } from "../data/mockData";

/* ---------------- Role Button ---------------- */

interface RoleBtnProps {
  role: RoleType;
  count: number;
  onClick: () => void;
  disabled: boolean;
}

const RoleButton: React.FC<RoleBtnProps> = ({ role, count, onClick, disabled }) => {
  const isManager = role === "manager";
  const LabelIcon = isManager ? PersonIcon : EngineeringIcon;
  const label = isManager ? "Manager" : "Worker";

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      fullWidth
      variant="outlined"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 14,
        borderRadius: 12,
        borderColor: disabled ? "#e5e7eb" : "#86efac",
        background: disabled ? "#f9fafb" : "#f0fdf4",
        color: disabled ? "#9ca3af" : "#15803d",
        textTransform: "none"
      }}
    >
      <Box
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: disabled ? "#f3f4f6" : "#bbf7d0",
          border: "1px solid #86efac",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 6
        }}
      >
        <LabelIcon style={{ fontSize: 20 }} />
      </Box>

      <Typography style={{ fontWeight: 700 }}>{label}</Typography>

      <Chip
        label={`${count} record${count !== 1 ? "s" : ""}`}
        size="small"
        style={{
          marginTop: 6,
          background: "#dcfce7",
          border: "1px solid #86efac",
          fontWeight: 700
        }}
      />
    </Button>
  );
};

/* ---------------- Home Page ---------------- */

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [selectedCountry, setSelectedCountry] = React.useState<string>("US");
  const [selectedYear, setSelectedYear] = React.useState<number>(2024);

  const managerCount = getRecordCount(selectedCountry, selectedYear, "manager");
  const workerCount = getRecordCount(selectedCountry, selectedYear, "worker");
  const noData = managerCount === 0 && workerCount === 0;

  const selectedCountryLabel =
    COUNTRIES.find(c => c.key === selectedCountry)?.text ?? selectedCountry;

  const handleCountryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCountry(event.target.value as string);
  };

  const handleYearChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedYear(Number(event.target.value));
  };

  return (
    <Box
      style={{
        height: "100%",
        width: "100%",
        background: "#f8fafc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        boxSizing: "border-box",
        fontFamily: "Segoe UI, sans-serif"
      }}
    >
      <Card
        elevation={3}
        style={{
          width: "100%",
          maxWidth: 420,
          borderRadius: 16
        }}
      >
        <CardContent style={{ padding: 24 }}>
          {/* Header */}
          <Box textAlign="center" mb={2}>
            <PublicIcon style={{ fontSize: 36, color: "#16a34a" }} />
            <Typography variant="h6" style={{ fontWeight: 700 }}>
              Workforce Map
            </Typography>
            <Typography style={{ fontSize: 13, color: "#6b7280" }}>
              Explore managers and workers by region
            </Typography>
          </Box>

          {/* Country dropdown */}
          <FormControl fullWidth size="small" style={{ marginTop: 12 }}>
            <InputLabel>Country</InputLabel>
            <Select value={selectedCountry} onChange={handleCountryChange}>
              {COUNTRIES.map(c => (
                <MenuItem key={c.key} value={c.key}>
                  {c.flag} {c.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Year dropdown */}
          <FormControl fullWidth size="small" style={{ marginTop: 12 }}>
            <InputLabel>Year</InputLabel>
            <Select value={selectedYear} onChange={handleYearChange}>
              {YEARS.map(y => (
                <MenuItem key={y.key} value={y.key}>
                  {y.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Divider style={{ margin: "20px 0" }} />

          {/* Role buttons — MUI v4 SAFE (no gap) */}
          <Box display="flex" mt={1}>
            <Box style={{ flex: 1, marginRight: 6 }}>
              <RoleButton
                role="manager"
                count={managerCount}
                onClick={() => onNavigate("manager", selectedCountry, selectedYear)}
                disabled={managerCount === 0}
              />
            </Box>

            <Box style={{ flex: 1, marginLeft: 6 }}>
              <RoleButton
                role="worker"
                count={workerCount}
                onClick={() => onNavigate("worker", selectedCountry, selectedYear)}
                disabled={workerCount === 0}
              />
            </Box>
          </Box>

          {noData && (
            <Typography
              style={{
                color: "#ef4444",
                marginTop: 12,
                textAlign: "center",
                fontSize: 13
              }}
            >
              No data available for {selectedCountryLabel} in {selectedYear}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};