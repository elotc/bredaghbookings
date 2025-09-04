import { Body, Button, Container, Head, Heading, Html, Img, Preview, Section, Tailwind, Text, } from '@react-email/components';

interface BookingRequestEmailProps {
  fromName: string;
  relatingTo: string;
  label: string;
  message: string;
  bookingLink: string;
}

const baseUrl = process.env.BASE_URL ? `http://${process.env.BASE_URL}` : '';

export const BookingUpdateEmail = ({
  fromName,
  relatingTo,
  label,
  message,
  bookingLink,
}: BookingRequestEmailProps) => {
  const previewText = `Booking update from ${fromName} for ${relatingTo}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-[#eaeaea] border-solid p-[20px]">

            <Heading className="mx-0 my-[10px] p-0 text-center font-normal text-[18px] text-black">
              Booking Request/Update
            </Heading>
            <Section className="text-center">
              <Text>Booking: <strong>{relatingTo}</strong></Text>
              <Text>Update from: {fromName}</Text>
            </Section>
            <Section>
              <Text className='text-[12px] text-black leading-[24px]'>
                {label}
              </Text>
              <Text className='text-[14px] text-black border border-[#eaeaea] border-solid p-[20px]'>
                {message}
              </Text>
            </Section>
            <Section className="mt-[32px] mb-[32px] text-center">
              <Text className="text-[12px] text-black leading-[24px]">
                To view this booking, please click the button below:
              </Text>
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={bookingLink}
              >
                View Booking
              </Button>
            </Section>
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/bredagh-crest.svg`}
                width="80"
                height="74"
                alt="Bredagh"
                className="mx-auto my-0"
              />
            </Section>

          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default BookingUpdateEmail;
