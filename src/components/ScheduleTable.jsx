// src/components/ScheduleTable.jsx
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Card,
  CardContent,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";

const ScheduleTable = ({ org, ageGroup, onBack }) => {
  const [tab, setTab] = useState("upcoming");
  const isMobile = useMediaQuery("(max-width:600px)");
  const now = new Date();

  const games = org.games.filter((g) => g.ageGroup === ageGroup);
  const upcoming = games.filter((g) => new Date(g.date) >= now);
  const completed = games.filter((g) => new Date(g.date) < now);
  const displayed = tab === "upcoming" ? upcoming : completed;

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Breadcrumb */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 0.5, fontSize: { xs: "0.8rem", md: "0.9rem" } }}
      >
        Dashboard / {org.name} / {ageGroup}
      </Typography>

      {/* Title */}
      <Typography
        variant="h5"
        sx={{ mt: 1, fontSize: { xs: "1.25rem", md: "1.5rem" } }}
      >
        Game Schedule
      </Typography>

      {/* Subtext */}
      <Typography
        variant="body1"
        sx={{ mb: 2, fontSize: { xs: "0.9rem", md: "1rem" } }}
      >
        {org.name} — {ageGroup}{" "}
        <span style={{ color: "#6b7280" }}>Upcoming matchups & notes</span>
      </Typography>

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={(e, v) => setTab(v)}
        variant={isMobile ? "fullWidth" : "standard"}
        sx={{
          mb: 2,
          borderBottom: "1px solid #e5e7eb",
          "& .MuiTab-root": { textTransform: "none", fontWeight: 500 },
        }}
      >
        <Tab label="Upcoming" value="upcoming" />
        <Tab label="Completed" value="completed" />
      </Tabs>

      {/* MOBILE VIEW - CARD LIST */}
      {isMobile ? (
        <Box>
          {displayed.length > 0 ? (
            displayed.map((g) => (
              <Card
                key={g.id}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  boxShadow:
                    "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
                }}
              >
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, color: "#1e3a8a" }}
                  >
                    {g.matchup}
                  </Typography>
                  <Typography sx={{ fontSize: "0.9rem" }}>
                    📅 <strong>Date:</strong> {g.date}
                  </Typography>
                  <Typography sx={{ fontSize: "0.9rem" }}>
                    ⏰ <strong>Time:</strong> {g.time}
                  </Typography>
                  <Typography sx={{ fontSize: "0.9rem" }}>
                    📍{" "}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        g.location
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "#2563eb",
                        textDecoration: "none",
                        fontWeight: 500,
                      }}
                    >
                      {g.location}
                    </a>
                  </Typography>
                  {g.notes && (
                    <Typography
                      sx={{
                        fontSize: "0.85rem",
                        mt: 1,
                        color: "#4b5563",
                        fontStyle: "italic",
                      }}
                    >
                      📝 {g.notes}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography
              variant="body2"
              sx={{ textAlign: "center", py: 3, color: "#6b7280" }}
            >
              No games scheduled yet for {org.name} {ageGroup}.
            </Typography>
          )}
        </Box>
      ) : (
        // DESKTOP TABLE VIEW
        <Box
          sx={{
            width: "100%",
            overflowX: "auto",
            borderRadius: 2,
            boxShadow:
              "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
            backgroundColor: "white",
          }}
        >
          <Table
            sx={{
              minWidth: 600,
              "& th": {
                backgroundColor: "#eff6ff",
                color: "#1e3a8a",
                fontWeight: 600,
              },
              "& td, & th": { fontSize: { xs: "0.8rem", md: "0.95rem" } },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>Matchup</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Special Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayed.length > 0 ? (
                displayed.map((g) => (
                  <TableRow
                    key={g.id}
                    hover
                    sx={{
                      "&:hover": { backgroundColor: "#f9fafb" },
                      transition: "background 0.2s ease",
                    }}
                  >
                    <TableCell sx={{ minWidth: 120 }}>{g.matchup}</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>{g.date}</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>{g.time}</TableCell>
                    <TableCell sx={{ minWidth: 140 }}>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          g.location
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          color: "#2563eb",
                          textDecoration: "none",
                          fontWeight: 500,
                        }}
                      >
                        {g.location}
                      </a>
                    </TableCell>
                    <TableCell sx={{ minWidth: 200 }}>{g.notes}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} sx={{ textAlign: "center", py: 4 }}>
                    No games scheduled yet for {org.name} {ageGroup}.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      )}

      {/* Back Button */}
      <Button
        variant="outlined"
        sx={{
          mt: 3,
          textTransform: "none",
          fontWeight: 500,
          borderRadius: 2,
          borderColor: "#3b82f6",
          color: "#2563eb",
          "&:hover": {
            backgroundColor: "#eff6ff",
            borderColor: "#2563eb",
          },
        }}
        onClick={onBack}
      >
        ← Back to Age Groups
      </Button>
    </Box>
  );
};

export default ScheduleTable;
