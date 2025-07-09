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

interface BookingAckEmailProps {
  username?: string;
  relatingTo?: string;
  bookingLink?: string;
}

const baseUrl = process.env.BASE_URL
  ? `http://${process.env.BASE_URL}`
  : '';

export const BookingAckEmail = ({
  username,
  relatingTo,
  bookingLink,
}: BookingAckEmailProps) => {
  const previewText = `Your booking for ${relatingTo} is being processed`;

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
              You have submitted a facility booking on the <strong>Bredagh Bookings</strong> app.
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hello {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Your booking has been forwarded to the authorisers for review.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              To view this booking, please click the button below:
            </Text>
            <Section className="mt-[32px] mb-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={bookingLink}
              >
                View Booking
              </Button>
            </Section>
            
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This invitation was intended for{' '}
              <span className="text-black">{username}</span>. If you
              were not expecting this invitation, you can ignore this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};


export default BookingAckEmail;
