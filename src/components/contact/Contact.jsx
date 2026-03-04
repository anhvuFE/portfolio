import React, { useState } from "react";
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
  EnvironmentOutlined
} from "@ant-design/icons";
import { Container, Box } from "@mui/material";
import "./contact.css";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const Contact = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: <MailOutlined style={{ fontSize: 24 }} />,
      title: "Email",
      content: "vuxuananh22@gmail.com",
      link: "mailto:vuxuananh22@gmail.com",
      action: "Send Email",
      color: "#667eea"
    },
    {
      icon: <PhoneOutlined style={{ fontSize: 24 }} />,
      title: "Phone",
      content: "+84 982 168 318",
      link: "tel:+84982168318",
      action: "Call Now",
      color: "#764ba2"
    },
    {
      icon: <LinkedinOutlined style={{ fontSize: 24 }} />,
      title: "LinkedIn",
      content: "Vũ Xuân Anh",
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
      color: "#333"
    }
  ];

  const sendEmail = (values) => {
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
      .catch((error) => {
        console.error(error);
        message.error("Failed to send message. Please try again.");
        setIsSubmitting(false);
      });
  };

  return (
    <Box
      component="section"
      id="contact"
      sx={{
        py: { xs: 8, md: 12 },
        background: "linear-gradient(135deg, rgba(102, 126, 234, 0.02) 0%, rgba(118, 75, 162, 0.02) 100%)",
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
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
              Let's Connect
            </Title>
            <Paragraph
              style={{
                fontSize: "1.125rem",
                color: "rgba(0, 0, 0, 0.65)",
                maxWidth: 600,
                margin: "0 auto"
              }}
            >
              Have a project in mind or just want to say hello? I'd love to hear from you!
            </Paragraph>
          </Box>

        <Row gutter={[32, 32]}>
          <Col xs={24} lg={10}>
              <div>
                <Title level={3} style={{ marginBottom: 24, color: "#333" }}>
                  Get In Touch
                </Title>

                <Space size="large" style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                  {contactInfo.map((info, index) => (
                      <Card
                        key={index}
                        hoverable
                        style={{
                          borderRadius: 12,
                          border: "1px solid rgba(102, 126, 234, 0.15)",
                          background: "rgba(255, 255, 255, 0.9)",
                          backdropFilter: "blur(10px)",
                          transition: "all 0.3s ease"
                        }}
                        styles={{ body: { padding: 20 } }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-4px)";
                          e.currentTarget.style.boxShadow = "0 12px 24px rgba(102, 126, 234, 0.15)";
                          e.currentTarget.style.borderColor = "rgba(102, 126, 234, 0.3)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "";
                          e.currentTarget.style.borderColor = "rgba(102, 126, 234, 0.15)";
                        }}
                      >
                        <Space align="start" size="middle">
                          <Box
                            sx={{
                              width: 48,
                              height: 48,
                              borderRadius: "50%",
                              background: `linear-gradient(135deg, ${info.color}20 0%, ${info.color}10 100%)`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: info.color
                            }}
                          >
                            {info.icon}
                          </Box>
                          <div style={{ flex: 1 }}>
                            <Text strong style={{ fontSize: "1rem", display: "block", marginBottom: 4 }}>
                              {info.title}
                            </Text>
                            <Text style={{ color: "rgba(0, 0, 0, 0.65)", display: "block", marginBottom: 8 }}>
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

                <Divider style={{ margin: "32px 0" }} />

                <Card
                  style={{
                    borderRadius: 12,
                    background: "linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)",
                    border: "1px solid rgba(102, 126, 234, 0.1)"
                  }}
                  styles={{ body: { padding: 24 } }}
                >
                  <Space size="small" style={{ display: "flex", flexDirection: "column" }}>
                    <EnvironmentOutlined style={{ fontSize: 20, color: "#667eea" }} />
                    <Title level={5} style={{ margin: "8px 0" }}>Location</Title>
                    <Text style={{ color: "rgba(0, 0, 0, 0.65)" }}>
                      Hanoi, Vietnam
                    </Text>
                    <Text type="secondary" style={{ fontSize: "0.875rem" }}>
                      Available for remote work worldwide
                    </Text>
                  </Space>
                </Card>
              </div>
          </Col>

          <Col xs={24} lg={14}>
              <Card
                style={{
                  borderRadius: 16,
                  boxShadow: "0 10px 40px rgba(102, 126, 234, 0.1)",
                  border: "1px solid rgba(102, 126, 234, 0.15)",
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(20px)"
                }}
                styles={{ body: { padding: 32 } }}
              >
                <Title level={3} style={{ marginBottom: 24, color: "#333" }}>
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
                        label={<Text strong>Your Name</Text>}
                        rules={[{ required: true, message: "Please enter your name" }]}
                      >
                        <Input
                          prefix={<UserOutlined />}
                          placeholder="John Doe"
                          size="large"
                          style={{
                            borderRadius: 8,
                            borderColor: "rgba(102, 126, 234, 0.3)"
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="email"
                        label={<Text strong>Your Email</Text>}
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
                            borderColor: "rgba(102, 126, 234, 0.3)"
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="subject"
                    label={<Text strong>Subject</Text>}
                    rules={[{ required: true, message: "Please enter a subject" }]}
                  >
                    <Input
                      prefix={<ProjectOutlined />}
                      placeholder="Project inquiry, collaboration, or just saying hi!"
                      size="large"
                      style={{
                        borderRadius: 8,
                        borderColor: "rgba(102, 126, 234, 0.3)"
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="message"
                    label={<Text strong>Your Message</Text>}
                    rules={[{ required: true, message: "Please enter your message" }]}
                  >
                    <TextArea
                      placeholder="Tell me about your project or idea..."
                      rows={6}
                      style={{
                        borderRadius: 8,
                        borderColor: "rgba(102, 126, 234, 0.3)",
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
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        border: "none",
                        borderRadius: 8,
                        height: 48,
                        fontSize: "1rem",
                        fontWeight: 600,
                        width: "100%",
                        boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
                        transition: "all 0.3s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.3)";
                      }}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </Form.Item>
                </Form>

                <Divider style={{ margin: "24px 0" }} />

                <Box sx={{ textAlign: "center" }}>
                  <Text type="secondary">
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
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    />
                    <Button
                      type="text"
                      icon={<GithubOutlined style={{ fontSize: 20 }} />}
                      href="https://github.com/anhvuFE"
                      target="_blank"
                      style={{
                        color: "#333",
                        transition: "transform 0.3s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
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
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    />
                  </Space>
                </Box>
              </Card>
          </Col>
        </Row>

      </Container>
    </Box>
  );
};

export default Contact;