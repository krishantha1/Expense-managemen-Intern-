import { Card, CardContent, CardHeader } from "@/components/ui/card";

const FormPageContainer = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="py-8 px-4 mx-auto max-w-4xl lg:py-16">
      <Card>
        <CardHeader>
          <h1 className="mb-4 text-xl font-bold">{title}</h1>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
};

const TablePageContainer = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">{title}</h1>
      <div>{children}</div>
    </div>
  );
};

type PageContainerProps = {
  title: string;
  children: React.ReactNode;
  pageType: "form" | "table";
};

export const PageContainer = ({
  title,
  children,
  pageType,
}: PageContainerProps) => {
  return (
    <>
      {pageType === "form" ? (
        <FormPageContainer title={title}>{children}</FormPageContainer>
      ) : (
        <TablePageContainer title={title}>{children}</TablePageContainer>
      )}
    </>
  );
};
