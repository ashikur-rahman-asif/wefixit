import Container from "@/components/Container";
import Logo from "@/components/icons/logo";

export default function Home() {
  return (
    <Container>
      <div className="flex items-center justify-between">
        <h1 className="text-brand ">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint,
          tempora?
        </h1>
        <Logo />
      </div>
    </Container>
  );
}
