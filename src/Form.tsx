import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  TextField,
  Typography
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const schema = z.object({
  birthday: z.date().optional()
});

const Form = () => {
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm({
    resolver: zodResolver(schema)
  });

  const customSubmit = (data) => console.log(data);

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <form onSubmit={handleSubmit(customSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <FormControl component="fieldset" error={!!errors?.birthday}>
              <FormLabel component="legend">Birthday</FormLabel>
              <Controller
                name="birthday"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error, invalid }
                }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      disableFuture
                      inputFormat="DD/MM/YYYY"
                      value={value}
                      onChange={(value) => onChange(dayjs(value).toDate())}
                      renderInput={(params) => (
                        <TextField
                          error={invalid}
                          helperText={invalid ? error.message : null}
                          variant="standard"
                          margin="dense"
                          fullWidth
                          color="primary"
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                )}
              />
            </FormControl>
            <Box>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Box>
          </Box>
        </form>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <a href="https://www.linkedin.com/in/tiavina-michael-ralainirina/">
            <Typography>By Tiavina Michael Ralainirina</Typography>
          </a>
        </Box>
      </Box>
    </Container>
  );
};

export default Form;
