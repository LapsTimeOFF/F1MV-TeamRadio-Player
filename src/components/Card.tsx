import { Paper, Stack, Typography } from "@mui/material";
import React from "react";

const Card = ({ url, name, colorTeam}: { url: string, name: string, colorTeam: string }) => {
  return (
    <Paper
      sx={{
        width: 410,
        height: 150,
        background: "#171925",
        color: "white",
      }}
      elevation={2}
    >
      <Stack direction="row" spacing={-5} sx={{ my: 0.5, mx: 0.5 }}>
        <img
          src={
            url
          }
          style={{
            width: '150px',
            height: '150px',
            marginLeft: '-10px',
          }}
        />
        <Stack direction='column'>
          <Typography
            sx={{
              textAlign: "right",
              fontSize: 45,
              letterSpacing: -2,
              color: '#' + colorTeam,
            }}
          >
            <b>{name}</b>
          </Typography>
          <Typography
            sx={{
              textAlign: "right",
              fontSize: 45,
              letterSpacing: -2,
              my: -2.5,
            }}
          >
            <b>RADIO</b>
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Card;
