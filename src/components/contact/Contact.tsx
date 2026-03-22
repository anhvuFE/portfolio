import React, { useState, useCallback } from "react";
import emailjs from "@emailjs/browser";
import { Form, Input, Button, Card, Row, Col, Typography, message, Space, Divider, notification } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  SendOutlined,
  UserOutlined,
  ProjectOutlined,
  LinkedinOutlined,
  GithubOutlined,
  FacebookOutlined,
  CheckCircleOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  ThunderboltOutlined
} from "@ant-design/icons";
import { Container, Box } from "@mui/material";
import "./contact.css";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

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

const contactInfo: ContactInfoItem[] = [
  {
    icon: <MailOutlined style={{ fontSize: 24 }} />,
    title: "Email",
    content: "vuxuananh22@gmail.com",
    link: "mailto:vuxuananh22@gmail.com",
    action: "Send Email",
    color: "#0eaddf"
  },
  {
    icon: <PhoneOutlined style={{ fontSize: 24 }} />,
    title: "Phone",
    content: "+84 982 168 318",
    link: "tel:+84982168318",
    action: "Call Now",
    color: "#0c8db3"
  },
  {
    icon: <LinkedinOutlined style={{ fontSize: 24 }} />,
    title: "LinkedIn",
    content: "Vu Xuan Anh",
    link: "https://www.linkedin.com/in/xu%C3%A2n-anh-v%C5%A9-515580367/",
    action: "Connect",
    color: "#0077B5"
  },
  {
    icon: <GithubOutlined style={{ fontSize: 24 }} />,
    title: "GitHub",
    content: "anhvuFE",
    link: "https://github.com/anhvuFE",
    action: "View Profile",
    color: "#e6edf3"
  }
];

const handleCardMouseEnter = (e: React.MouseEvent<HTMLDivElement>): void => {
  e.currentTarget.style.transform = "translateY(-4px)";
  e.currentTarget.style.boxShadow = "0 12px 24px rgba(14, 173, 223, 0.15)";
  e.currentTarget.style.borderColor = "rgba(14, 173, 223, 0.3)";
};

const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>): void => {
  e.currentTarget.style.transform = "translateY(0)";
  e.currentTarget.style.boxShadow = "";
  e.currentTarget.style.borderColor = "rgba(14, 173, 223, 0.15)";
};

const handleButtonMouseEnter = (e: React.MouseEvent<HTMLElement>): void => {
  e.currentTarget.style.transform = "translateY(-2px)";
  e.currentTarget.style.boxShadow = "0 8px 25px rgba(14, 173, 223, 0.4)";
};

const handleButtonMouseLeave = (e: React.MouseEvent<HTMLElement>): void => {
  e.currentTarget.style.transform = "translateY(0)";
  e.currentTarget.style.boxShadow = "0 4px 15px rgba(14, 173, 223, 0.3)";
};

const handleSocialMouseEnter = (e: React.MouseEvent<HTMLElement>): void => {
  e.currentTarget.style.transform = "scale(1.2)";
};

const handleSocialMouseLeave = (e: React.MouseEvent<HTMLElement>): void => {
  e.currentTarget.style.transform = "scale(1)";
};

const Contact: React.FC = () => {
  const [form] = Form.useForm<ContactFormValues>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const sendEmail = useCallback((values: ContactFormValues): void => {
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
        notification.success({
          message: "Message Sent Successfully!",
          description: "Thank you for reaching out. I'll get back to you soon.",
          icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
          placement: "topRight"
        });
        form.resetFields();
        setIsSubmitting(false);
      })
      .catch((error: Error) => {
        console.error(error);
        message.error("Failed to send message. Please try again.");
        setIsSubmitting(false);
      });
  }, [form]);

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
            <Title
              level={1}
              style={{
                fontSize: "3rem",
                fontWeight: 700,
                marginBottom: 16,
                color: "#0eaddf"
              }}
            >
              Let's Connect
            </Title>
            <Paragraph
              style={{
                fontSize: "1.125rem",
                color: "#8b949e",
                maxWidth: 600,
                margin: "0 auto"
              }}
            >
              Have a project in mind or just want to say hello? I'd love to hear from you!
            </Paragraph>
          </Box>

        <Row gutter={[32, 32]} align="stretch">
          <Col xs={24} lg={10} style={{ display: "flex" }}>
              <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                <Title level={3} style={{ marginBottom: 24, color: "#e6edf3" }}>
                  Get In Touch
                </Title>

                <Space size="large" style={{ width: "100%", display: "flex", flexDirection: "column" }} direction="vertical">
                  {contactInfo.map((info: ContactInfoItem, index: number) => (
                      <Card
                        key={index}
                        hoverable
                        style={{
                          borderRadius: 12,
                          border: "1px solid rgba(14, 173, 223, 0.15)",
                          background: "rgba(22, 22, 22, 0.9)",
                          backdropFilter: "blur(10px)",
                          transition: "all 0.3s ease",
                          width: "100%"
                        }}
                        styles={{ body: { padding: 20 } }}
                        onMouseEnter={handleCardMouseEnter}
                        onMouseLeave={handleCardMouseLeave}
                      >
                        <Space align="start" size="middle">
                          <Box
                            sx={{
                              width: 48,
                              height: 48,
                              borderRadius: "50%",
                              background: `${info.color}15`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: info.color
                            }}
                          >
                            {info.icon}
                          </Box>
                          <div style={{ flex: 1 }}>
                            <Text strong style={{ fontSize: "1rem", display: "block", marginBottom: 4, color: "#e6edf3" }}>
                              {info.title}
                            </Text>
                            <Text style={{ color: "#8b949e", display: "block", marginBottom: 8 }}>
                              {info.content}
                            </Text>
                            <Button
                              type="link"
                              href={info.link}
                              target={info.link.startsWith("http") ? "_blank" : undefined}
                              style={{ padding: 0, color: info.color, fontWeight: 500 }}
                              icon={<SendOutlined />}
                            >
                              {info.action}
                            </Button>
                          </div>
                        </Space>
                      </Card>
                  ))}
                </Space>

                <Divider style={{ margin: "32px 0", borderColor: "rgba(255, 255, 255, 0.08)" }} />

                <Card
                  style={{
                    borderRadius: 12,
                    background: "rgba(14, 173, 223, 0.05)",
                    border: "1px solid rgba(14, 173, 223, 0.1)",
                    flex: 1
                  }}
                  styles={{ body: { padding: 24, height: "100%", display: "flex", alignItems: "center", justifyContent: "center" } }}
                >
                  <Space size="small" style={{ display: "flex", flexDirection: "column" }}>
                    <EnvironmentOutlined style={{ fontSize: 20, color: "#0eaddf" }} />
                    <Title level={5} style={{ margin: "8px 0", color: "#e6edf3" }}>Location</Title>
                    <Text style={{ color: "#8b949e" }}>
                      Hanoi, Vietnam
                    </Text>
                    <Text style={{ fontSize: "0.875rem", color: "#8b949e" }}>
                      Available for remote work worldwide
                    </Text>
                  </Space>
                </Card>
              </div>
          </Col>

          <Col xs={24} lg={14} style={{ display: "flex" }}>
              <Card
                style={{
                  borderRadius: 16,
                  boxShadow: "0 10px 40px rgba(14, 173, 223, 0.1)",
                  border: "1px solid rgba(14, 173, 223, 0.15)",
                  background: "rgba(22, 22, 22, 0.95)",
                  backdropFilter: "blur(20px)",
                  width: "100%"
                }}
                styles={{ body: { padding: 32 } }}
              >
                <Title level={3} style={{ marginBottom: 24, color: "#e6edf3" }}>
                  Send Me a Message
                </Title>

                <Form
                  form={form}
                  layout="vertical"
                  onFinish={sendEmail}
                  requiredMark={false}
                >
                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="name"
                        label={<Text strong style={{ color: "#e6edf3" }}>Your Name</Text>}
                        rules={[{ required: true, message: "Please enter your name" }]}
                      >
                        <Input
                          prefix={<UserOutlined />}
                          placeholder="John Doe"
                          size="large"
                          style={{
                            borderRadius: 8,
                            borderColor: "rgba(14, 173, 223, 0.2)"
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="email"
                        label={<Text strong style={{ color: "#e6edf3" }}>Your Email</Text>}
                        rules={[
                          { required: true, message: "Please enter your email" },
                          { type: "email", message: "Please enter a valid email" }
                        ]}
                      >
                        <Input
                          prefix={<MailOutlined />}
                          placeholder="john@example.com"
                          size="large"
                          style={{
                            borderRadius: 8,
                            borderColor: "rgba(14, 173, 223, 0.2)"
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="subject"
                    label={<Text strong style={{ color: "#e6edf3" }}>Subject</Text>}
                    rules={[{ required: true, message: "Please enter a subject" }]}
                  >
                    <Input
                      prefix={<ProjectOutlined />}
                      placeholder="Project inquiry, collaboration, or just saying hi!"
                      size="large"
                      style={{
                        borderRadius: 8,
                        borderColor: "rgba(14, 173, 223, 0.2)"
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="message"
                    label={<Text strong style={{ color: "#e6edf3" }}>Your Message</Text>}
                    rules={[{ required: true, message: "Please enter your message" }]}
                  >
                    <TextArea
                      placeholder="Tell me about your project or idea..."
                      rows={6}
                      style={{
                        borderRadius: 8,
                        borderColor: "rgba(14, 173, 223, 0.2)",
                        resize: "none"
                      }}
                      maxLength={500}
                      showCount
                    />
                  </Form.Item>

                  <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      loading={isSubmitting}
                      icon={<SendOutlined />}
                      style={{
                        background: "#0eaddf",
                        color: "#0a0a0a",
                        border: "none",
                        borderRadius: 8,
                        height: 48,
                        fontSize: "1rem",
                        fontWeight: 600,
                        width: "100%",
                        boxShadow: "0 4px 15px rgba(14, 173, 223, 0.3)",
                        transition: "all 0.3s ease"
                      }}
                      onMouseEnter={handleButtonMouseEnter}
                      onMouseLeave={handleButtonMouseLeave}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </Form.Item>
                </Form>

                <Divider style={{ margin: "24px 0", borderColor: "rgba(255, 255, 255, 0.08)" }} />

                <Box sx={{ textAlign: "center" }}>
                  <Text style={{ color: "#8b949e" }}>
                    Or connect with me on social media
                  </Text>
                  <Space size="large" style={{ marginTop: 16 }}>
                    <Button
                      type="text"
                      icon={<LinkedinOutlined style={{ fontSize: 20 }} />}
                      href="https://www.linkedin.com/in/xu%C3%A2n-anh-v%C5%A9-515580367/"
                      target="_blank"
                      style={{
                        color: "#0077B5",
                        transition: "transform 0.3s ease"
                      }}
                      onMouseEnter={handleSocialMouseEnter}
                      onMouseLeave={handleSocialMouseLeave}
                    />
                    <Button
                      type="text"
                      icon={<GithubOutlined style={{ fontSize: 20 }} />}
                      href="https://github.com/anhvuFE"
                      target="_blank"
                      style={{
                        color: "#e6edf3",
                        transition: "transform 0.3s ease"
                      }}
                      onMouseEnter={handleSocialMouseEnter}
                      onMouseLeave={handleSocialMouseLeave}
                    />
                    <Button
                      type="text"
                      icon={<FacebookOutlined style={{ fontSize: 20 }} />}
                      href="https://www.facebook.com/xuananhvu2312/"
                      target="_blank"
                      style={{
                        color: "#1877F2",
                        transition: "transform 0.3s ease"
                      }}
                      onMouseEnter={handleSocialMouseEnter}
                      onMouseLeave={handleSocialMouseLeave}
                    />
                  </Space>
                </Box>

                <Divider style={{ margin: "24px 0", borderColor: "rgba(255, 255, 255, 0.08)" }} />

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
                    <Text style={{ color: "#8b949e", fontSize: "0.9rem" }}>
                      Available for freelance & full-time opportunities
                    </Text>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <ClockCircleOutlined style={{ color: "#0eaddf", fontSize: 14 }} />
                    <Text style={{ color: "#8b949e", fontSize: "0.9rem" }}>
                      Typical response time: within 24 hours
                    </Text>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <ThunderboltOutlined style={{ color: "#FFD700", fontSize: 14 }} />
                    <Text style={{ color: "#8b949e", fontSize: "0.9rem" }}>
                      Timezone: GMT+7 (Hanoi, Vietnam)
                    </Text>
                  </Box>
                </Box>
              </Card>
          </Col>
        </Row>

      </Container>
    </Box>
  );
};

export default Contact;
