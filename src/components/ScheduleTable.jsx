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

const ScheduleTable = ({ org, sport, ageGroup, onBack, schedules }) => {
  const [tab, setTab] = useState("upcoming");
  const isMobile = useMediaQuery("(max-width:600px)");
  const now = new Date();

  // Filter games for this organization, sport, and age group
  const games = schedules.filter(game => {
    const isOrgGame = game.team1.orgName === org.name || game.team2.orgName === org.name;
    const isSportMatch = game.team1.sport === sport;
    const isAgeGroupMatch = game.team1.ageGroup === ageGroup || game.team2.ageGroup === ageGroup;
    return isOrgGame && isSportMatch && isAgeGroupMatch;
  });

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Format time for display
  const formatTime = (timeString) => {
    return timeString; // API already provides formatted time like "09:00 AM"
  };

  // Separate upcoming and completed games
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
        Dashboard / {org.name} / {sport.replace('_', ' ')} / {ageGroup}
      </Typography>

      {/* Title */}
      <Typography
        variant="h5"
        sx={{ mt: 1, fontSize: { xs: "1.25rem", md: "1.5rem" } }}
      >
        {sport.replace('_', ' ')} - {ageGroup} Schedule
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
        <Tab label={`Upcoming (${upcoming.length})`} value="upcoming" />
        <Tab label={`Completed (${completed.length})`} value="completed" />
      </Tabs>

      {/* MOBILE VIEW - CARD LIST */}
      {isMobile ? (
        <Box>
          {displayed.length > 0 ? (
            displayed.map((game) => (
              <Card
                key={game.id}
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
                    {game.matchup}
                  </Typography>
                  <Typography sx={{ fontSize: "0.9rem" }}>
                    🏀 <strong>Sport:</strong> {game.team1.sport}
                  </Typography>
                  <Typography sx={{ fontSize: "0.9rem" }}>
                    📅 <strong>Date:</strong> {formatDate(game.date)}
                  </Typography>
                  <Typography sx={{ fontSize: "0.9rem" }}>
                    ⏰ <strong>Time:</strong> {formatTime(game.time)}
                  </Typography>
                  <Typography sx={{ fontSize: "0.9rem" }}>
                    📍{" "}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        game.location
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "#2563eb",
                        textDecoration: "none",
                        fontWeight: 500,
                      }}
                    >
                      {game.location}
                    </a>
                  </Typography>
                  {game.notes && (
                    <Typography
                      sx={{
                        fontSize: "0.85rem",
                        mt: 1,
                        color: "#4b5563",
                        fontStyle: "italic",
                      }}
                    >
                      📝 {game.notes}
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
              No {tab} games found for {org.name} {ageGroup}.
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
                <TableCell>Sport</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Special Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayed.length > 0 ? (
                displayed.map((game) => (
                  <TableRow
                    key={game.id}
                    hover
                    sx={{
                      "&:hover": { backgroundColor: "#f9fafb" },
                      transition: "background 0.2s ease",
                    }}
                  >
                    <TableCell sx={{ minWidth: 120 }}>{game.matchup}</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>{game.team1.sport}</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>{formatDate(game.date)}</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>{formatTime(game.time)}</TableCell>
                    <TableCell sx={{ minWidth: 140 }}>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          game.location
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          color: "#2563eb",
                          textDecoration: "none",
                          fontWeight: 500,
                        }}
                      >
                        {game.location}
                      </a>
                    </TableCell>
                    <TableCell sx={{ minWidth: 200 }}>{game.notes}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} sx={{ textAlign: "center", py: 4 }}>
                    No {tab} games found for {org.name} {ageGroup}.
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