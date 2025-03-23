"use client";

import FrontContainer from "@/presentation/components/FrontContainer";
import {
  Button,
  Carousel,
  Col,
  Flex,
  Grid,
  Row,
  theme,
  Typography,
} from "antd";

const { useToken } = theme;
const { useBreakpoint } = Grid;

const contentStyle: React.CSSProperties = {
  // margin: 0,
  // color: "#fff",
  // textAlign: "center",
  // background: "#364d79",
};

const HeroSection = () => {
  const { token } = useToken();
  const screens = useBreakpoint();

  return (
    <section
      style={{
        backgroundColor: token.colorBgLayout,
      }}
    >
      <FrontContainer>
        <Row style={{ width: "100%" }}>
          <Col span={12}>
            <Flex vertical align="start" style={{ padding: "48px 0" }}>
              <Typography.Title level={screens.md ? 1 : 2}>
                Unlock the Fun. Solve the Challenge!
              </Typography.Title>
              <Typography.Paragraph style={{ maxWidth: "80ch" }}>
                Discover a world of exciting puzzles and brain-teasing toys that
                spark creativity, boost problem-solving skills, and provide
                endless fun for all ages!
              </Typography.Paragraph>
              <Button type="primary" href="https://ant.design" target="_blank">
                Shop Now
              </Button>
            </Flex>
          </Col>
          <Col span={12}>
            <Carousel arrows infinite={false}>
              <div>
                <h3 style={contentStyle}>1</h3>
              </div>
              <div>
                <h3 style={contentStyle}>2</h3>
              </div>
              <div>
                <h3 style={contentStyle}>3</h3>
              </div>
              <div>
                <h3 style={contentStyle}>4</h3>
              </div>
            </Carousel>
          </Col>
        </Row>
      </FrontContainer>
    </section>
  );
};

export default HeroSection;
