import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

interface VerificationRequestEmailProps {
  to: string;
  url: string;
  host: string;
}

const baseUrl = process.env.BASE_URL
  ? `http://${process.env.BASE_URL}`
  : '';

export const VerificationRequestEmail = ({
  to,
  url,
  host
}: VerificationRequestEmailProps) => {
  const previewText = `Sign into the Bredagh Booking app`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-[#eaeaea] border-solid p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/bredagh-crest.svg`}
                width="80"
                height="74"
                alt="Bredagh"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              Sign in to the <strong>Bredagh Bookings</strong> app.
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              To accept this invitation, please click the button below:
            </Text>
            <Section className="mt-[32px] mb-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={url}
              >
                Sign In
              </Button>
            </Section>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This email was intended for {to} <span className="text-black">{to}</span>. 
              If you did not request this email you can safely ignore it.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};


export default VerificationRequestEmail;
