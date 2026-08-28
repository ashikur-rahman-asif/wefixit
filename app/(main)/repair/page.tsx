import Container from "@/components/container";
import { SectionTitle } from "@/components/section-title";
import { RepairWizard } from "./_components/repair-wizard";
import { Suspense } from "react";
import { Loader } from "@/components/ui/loader";

export default function RepairPage() {
  return (
    <Container className="py-8">
      <SectionTitle
        title="What kind of device are you having trouble with?"
        subtitle="Our experts will assess your device and get it back to you in no time."
        titleClassName="max-w-[576px]"
      />

      <Suspense fallback={<div className="py-24 flex justify-center"><Loader size="md" /></div>}>
        <RepairWizard />
      </Suspense>
    </Container>
  );
}
