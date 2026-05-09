import React, { useState, useCallback } from "react";
import emailjs from "@emailjs/browser";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
  Snackbar,
  Alert,
  AlertTitle,
  IconButton,
  InputAdornment,
  Stack,
  CircularProgress
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  Send as SendIcon,
  Person as PersonIcon,
  Assignment as ProjectIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Facebook as FacebookIcon,
  CheckCircle as CheckCircleIcon,
  LocationOn as LocationIcon,
  AccessTime as ClockIcon,
  Bolt as BoltIcon
} from "@mui/icons-material";

interface ContactInfoItem {
  icon: React.ReactNode;
  title: string;
  content: string;
  link: string;
  action: string;
  color: string;
}

interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface ToastState {
  open: boolean;
  severity: "success" | "error";
  title: string;
  message: string;
}

const contactInfo: ContactInfoItem[] = [
  {
    icon: <EmailIcon sx={{ fontSize: 24 }} />,
    title: "Email",
    content: "vuxuananh22@gmail.com",
    link: "mailto:vuxuananh22@gmail.com",
    action: "Send Email",
    color: "#0eaddf"
  },
  {
    icon: <PhoneIcon sx={{ fontSize: 24 }} />,
    title: "Phone",
    content: "+84 982 168 318",
    link: "tel:+84982168318",
    action: "Call Now",
    color: "#0c8db3"
  },
  {
    icon: <LinkedInIcon sx={{ fontSize: 24 }} />,
    title: "LinkedIn",
    content: "Vu Xuan Anh",
    link: "https://www.linkedin.com/in/xu%C3%A2n-anh-v%C5%A9-515580367/",
    action: "Connect",
    color: "#0077B5"
  },
  {
    icon: <GitHubIcon sx={{ fontSize: 24 }} />,
    title: "GitHub",
    content: "anhvuFE",
    link: "https://github.com/anhvuFE",
    action: "View Profile",
    color: "#e6edf3"
  }
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MAX = 500;

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    background: "rgba(255,255,255,0.02)",
    "& fieldset": { borderColor: "rgba(14, 173, 223, 0.2)" },
    "&:hover fieldset": { borderColor: "rgba(14, 173, 223, 0.4)" },
    "&.Mui-focused fieldset": { borderColor: "#0eaddf" }
  },
  "& .MuiInputBase-input": { color: "#e6edf3" },
  "& .MuiInputBase-input::placeholder": { color: "#6e7681", opacity: 1 },
  "& .MuiInputLabel-root": { color: "#8b949e" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#0eaddf" }
};

const Contact: React.FC = () => {
  const [values, setValues] = useState<ContactFormValues>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastState>({
    open: false,
    severity: "success",
    title: "",
    message: ""
  });

  const handleChange = useCallback(
    (field: keyof ContactFormValues) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const v = e.target.value;
        setValues((prev) => ({ ...prev, [field]: v }));
        setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
      },
    []
  );

  const validate = useCallback((v: ContactFormValues): FormErrors => {
    const e: FormErrors = {};
    if (!v.name.trim()) e.name = "Please enter your name";
    if (!v.email.trim()) e.email = "Please enter your email";
    else if (!EMAIL_REGEX.test(v.email.trim())) e.email = "Please enter a valid email";
    if (!v.subject.trim()) e.subject = "Please enter a subject";
    if (!v.message.trim()) e.message = "Please enter your message";
    return e;
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const fieldErrors = validate(values);
      if (Object.keys(fieldErrors).length > 0) {
        setErrors(fieldErrors);
        return;
      }

      setIsSubmitting(true);
      const templateParams = {
        name: values.name,
        email: values.email,
        project: values.message,
        to_name: "Xuan Anh"
      };

      emailjs
        .send("service_u54tvkn", "template_kt9sbbg", templateParams, "y0KlrUodeWH1-Fg9W")
        .then(() => {
          setToast({
            open: true,
            severity: "success",
            title: "Message Sent Successfully!",
            message: "Thank you for reaching out. I'll get back to you soon."
          });
          setValues({ name: "", email: "", subject: "", message: "" });
          setErrors({});
        })
        .catch((err: Error) => {
          console.error(err);
          setToast({
            open: true,
            severity: "error",
            title: "Failed to send",
            message: "Please try again or email me directly."
          });
        })
        .finally(() => setIsSubmitting(false));
    },
    [values, validate]
  );

  const handleCloseToast = useCallback(() => {
    setToast((prev) => ({ ...prev, open: false }));
  }, []);

  return (
    <Box
      component="section"
      id="contact"
      sx={{
        py: { xs: 8, md: 12 },
        background: "#0a0a0a",
        minHeight: "100vh"
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: "clamp(2rem, 5vw + 1rem, 3rem)",
              fontWeight: 700,
              mb: 2,
              color: "#0eaddf"
            }}
          >
            Let's Connect
          </Typography>
          <Typography
            sx={{
              fontSize: "1.125rem",
              color: "#8b949e",
              maxWidth: 600,
              mx: "auto"
            }}
          >
            Have a project in mind or just want to say hello? I'd love to hear from you!
          </Typography>
        </Box>

        <Grid container spacing={4} alignItems="stretch">
          <Grid size={{ xs: 12, lg: 5 }} sx={{ display: "flex" }}>
            <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
              <Typography variant="h5" sx={{ mb: 3, color: "#e6edf3", fontWeight: 600 }}>
                Get In Touch
              </Typography>

              <Stack spacing={2}>
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    sx={{
                      borderRadius: 3,
                      border: "1px solid rgba(14, 173, 223, 0.15)",
                      background: "rgba(22, 22, 22, 0.9)",
                      backdropFilter: "blur(10px)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 12px 24px rgba(14, 173, 223, 0.15)",
                        borderColor: "rgba(14, 173, 223, 0.3)"
                      }
                    }}
                  >
                    <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
                      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: "50%",
                            background: `${info.color}15`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: info.color,
                            flexShrink: 0
                          }}
                        >
                          {info.icon}
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography sx={{ fontWeight: 600, fontSize: "1rem", color: "#e6edf3", mb: 0.5 }}>
                            {info.title}
                          </Typography>
                          <Typography sx={{ color: "#8b949e", mb: 1, fontSize: "0.9rem", wordBreak: "break-word" }}>
                            {info.content}
                          </Typography>
                          <Button
                            href={info.link}
                            target={info.link.startsWith("http") ? "_blank" : undefined}
                            rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                            startIcon={<SendIcon sx={{ fontSize: 16 }} />}
                            size="small"
                            sx={{
                              p: 0,
                              minWidth: 0,
                              color: info.color,
                              fontWeight: 500,
                              textTransform: "none",
                              "&:hover": { background: "transparent", textDecoration: "underline" }
                            }}
                          >
                            {info.action}
                          </Button>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Stack>

              <Divider sx={{ my: 4, borderColor: "rgba(255, 255, 255, 0.08)" }} />

              <Card
                sx={{
                  borderRadius: 3,
                  background: "rgba(14, 173, 223, 0.05)",
                  border: "1px solid rgba(14, 173, 223, 0.1)",
                  flex: 1
                }}
              >
                <CardContent
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    "&:last-child": { pb: 3 }
                  }}
                >
                  <LocationIcon sx={{ fontSize: 24, color: "#0eaddf", mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, color: "#e6edf3", mb: 0.5 }}>
                    Location
                  </Typography>
                  <Typography sx={{ color: "#8b949e" }}>Hanoi, Vietnam</Typography>
                  <Typography sx={{ color: "#8b949e", fontSize: "0.875rem" }}>
                    Available for remote work worldwide
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, lg: 7 }} sx={{ display: "flex" }}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: "0 10px 40px rgba(14, 173, 223, 0.1)",
                border: "1px solid rgba(14, 173, 223, 0.15)",
                background: "rgba(22, 22, 22, 0.95)",
                backdropFilter: "blur(20px)",
                width: "100%"
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Typography variant="h5" sx={{ mb: 3, color: "#e6edf3", fontWeight: 600 }}>
                  Send Me a Message
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        label="Your Name"
                        placeholder="John Doe"
                        value={values.name}
                        onChange={handleChange("name")}
                        error={Boolean(errors.name)}
                        helperText={errors.name || " "}
                        fullWidth
                        size="medium"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon sx={{ color: "#6e7681", fontSize: 20 }} />
                            </InputAdornment>
                          )
                        }}
                        sx={inputSx}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        label="Your Email"
                        placeholder="john@example.com"
                        type="email"
                        value={values.email}
                        onChange={handleChange("email")}
                        error={Boolean(errors.email)}
                        helperText={errors.email || " "}
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon sx={{ color: "#6e7681", fontSize: 20 }} />
                            </InputAdornment>
                          )
                        }}
                        sx={inputSx}
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    label="Subject"
                    placeholder="Project inquiry, collaboration, or just saying hi!"
                    value={values.subject}
                    onChange={handleChange("subject")}
                    error={Boolean(errors.subject)}
                    helperText={errors.subject || " "}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ProjectIcon sx={{ color: "#6e7681", fontSize: 20 }} />
                        </InputAdornment>
                      )
                    }}
                    sx={inputSx}
                  />

                  <TextField
                    label="Your Message"
                    placeholder="Tell me about your project or idea..."
                    value={values.message}
                    onChange={handleChange("message")}
                    error={Boolean(errors.message)}
                    helperText={
                      <Box component="span" sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
                        <Box component="span">{errors.message || " "}</Box>
                        <Box component="span" sx={{ color: "#6e7681", flexShrink: 0 }}>
                          {values.message.length} / {MESSAGE_MAX}
                        </Box>
                      </Box>
                    }
                    fullWidth
                    multiline
                    rows={6}
                    inputProps={{ maxLength: MESSAGE_MAX }}
                    sx={{ ...inputSx, mt: 1 }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={isSubmitting}
                    startIcon={
                      isSubmitting ? (
                        <CircularProgress size={18} sx={{ color: "rgba(10,10,10,0.6)" }} />
                      ) : (
                        <SendIcon />
                      )
                    }
                    sx={{
                      mt: 3,
                      background: "#0eaddf",
                      color: "#0a0a0a",
                      borderRadius: 2,
                      height: 48,
                      fontSize: "1rem",
                      fontWeight: 600,
                      textTransform: "none",
                      boxShadow: "0 4px 15px rgba(14, 173, 223, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "#0c8db3",
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 25px rgba(14, 173, 223, 0.4)"
                      },
                      "&.Mui-disabled": { background: "rgba(14, 173, 223, 0.5)", color: "rgba(10,10,10,0.7)" }
                    }}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </Box>

                <Divider sx={{ my: 3, borderColor: "rgba(255, 255, 255, 0.08)" }} />

                <Box sx={{ textAlign: "center" }}>
                  <Typography sx={{ color: "#8b949e", mb: 1 }}>
                    Or connect with me on social media
                  </Typography>
                  <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 1 }}>
                    <IconButton
                      href="https://www.linkedin.com/in/xu%C3%A2n-anh-v%C5%A9-515580367/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      sx={{
                        color: "#0077B5",
                        transition: "transform 0.3s ease",
                        "&:hover": { transform: "scale(1.2)", background: "rgba(0, 119, 181, 0.08)" }
                      }}
                    >
                      <LinkedInIcon />
                    </IconButton>
                    <IconButton
                      href="https://github.com/anhvuFE"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      sx={{
                        color: "#e6edf3",
                        transition: "transform 0.3s ease",
                        "&:hover": { transform: "scale(1.2)", background: "rgba(255, 255, 255, 0.05)" }
                      }}
                    >
                      <GitHubIcon />
                    </IconButton>
                    <IconButton
                      href="https://www.facebook.com/xuananhvu2312/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      sx={{
                        color: "#1877F2",
                        transition: "transform 0.3s ease",
                        "&:hover": { transform: "scale(1.2)", background: "rgba(24, 119, 242, 0.08)" }
                      }}
                    >
                      <FacebookIcon />
                    </IconButton>
                  </Stack>
                </Box>

                <Divider sx={{ my: 3, borderColor: "rgba(255, 255, 255, 0.08)" }} />

                <Stack spacing={1.5}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: "#22c55e",
                        boxShadow: "0 0 8px rgba(34, 197, 94, 0.5)"
                      }}
                    />
                    <Typography sx={{ color: "#8b949e", fontSize: "0.9rem" }}>
                      Available for freelance & full-time opportunities
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <ClockIcon sx={{ color: "#0eaddf", fontSize: 16 }} />
                    <Typography sx={{ color: "#8b949e", fontSize: "0.9rem" }}>
                      Typical response time: within 24 hours
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <BoltIcon sx={{ color: "#FFD700", fontSize: 16 }} />
                    <Typography sx={{ color: "#8b949e", fontSize: "0.9rem" }}>
                      Timezone: GMT+7 (Hanoi, Vietnam)
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={toast.open}
        autoHideDuration={5000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          variant="filled"
          icon={toast.severity === "success" ? <CheckCircleIcon /> : undefined}
          sx={{ minWidth: 320 }}
        >
          <AlertTitle sx={{ fontWeight: 700, mb: 0.5 }}>{toast.title}</AlertTitle>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
