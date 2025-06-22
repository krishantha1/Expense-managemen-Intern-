"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { VisaPrice, VisaSupplier } from "@prisma/client";

type PaginationControlProps = {
  entity:
    | "visa-applications"
    | "air-tickets"
    | "expenses"
    | "visa-prices"
    | "visa-suppliers"
    | "employees"
    | "business-services";
  nextCursor: string | null;
  previousCursor: string | null;
  orderedBy?:
    | keyof Omit<VisaPrice, "requiredDocs" | "note">
    | keyof Omit<VisaSupplier, "note">;
  orderDirection?: "asc" | "desc";
};

export const PaginationControl = ({
  entity,
  nextCursor,
  previousCursor,
  orderedBy = "id",
  orderDirection = "desc",
}: PaginationControlProps) => {
  const { replace } = useRouter();

  const handleNext = () => {
    replace(
      `/${entity}?cursor=${nextCursor}&direction=next&orderedBy=${orderedBy}&orderDirection=${orderDirection}`
    );
  };

  const handlePrevious = () => {
    replace(
      `/${entity}?cursor=${previousCursor}&direction=prev&orderedBy=${orderedBy}&orderDirection=${orderDirection}`
    );
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button onClick={handlePrevious} disabled={previousCursor === null}>
            Previous
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button onClick={handleNext} disabled={nextCursor === null}>
            Next
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

// "use client";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
// } from "@/components/ui/pagination";
// // Import Link from next/link
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { VisaPrice } from "@prisma/client";

// type PaginationControlProps = {
//   entity:
//     | "visa-applications"
//     | "air-tickets"
//     | "expenses"
//     | "visa-prices"
//     | "employees"
//     | "business-services";
//   nextCursor: string | null;
//   previousCursor: string | null;
//   orderedBy?: keyof VisaPrice;
//   orderDirection?: "asc" | "desc";
// };

// export const PaginationControl = ({
//   entity,
//   nextCursor,
//   previousCursor,
//   orderedBy = "id",
//   orderDirection = "desc",
// }: PaginationControlProps) => {
//   // useRouter is no longer needed if Link handles all navigation
//   // const { replace } = useRouter();

//   // const handleNext = () => {
//   //   replace(
//   //     `/${entity}?cursor=${nextCursor}&direction=next&orderedBy=${orderedBy}&orderDirection=${orderDirection}`
//   //   );
//   // };

//   // const handlePrevious = () => {
//   //   replace(
//   //     `/${entity}?cursor=${previousCursor}&direction=prev&orderedBy=${orderedBy}&orderDirection=${orderDirection}`
//   //   );
//   // };

//   const prevHref = `/${entity}?cursor=${previousCursor}&direction=prev&orderedBy=${orderedBy}&orderDirection=${orderDirection}`;
//   const nextHref = `/${entity}?cursor=${nextCursor}&direction=next&orderedBy=${orderedBy}&orderDirection=${orderDirection}`;

//   return (
//     <Pagination>
//       <PaginationContent>
//         <PaginationItem>
//           {previousCursor !== null ? (
//             <Link href={prevHref} replace passHref legacyBehavior={false} asChild>
//               <Button>Previous</Button>
//             </Link>
//           ) : (
//             <Button disabled>Previous</Button>
//           )}
//         </PaginationItem>
//         <PaginationItem>
//           {nextCursor !== null ? (
//             <Link href={nextHref} replace passHref legacyBehavior={false} asChild>
//               <Button>Next</Button>
//             </Link>
//           ) : (
//             <Button disabled>Next</Button>
//           )}
//         </PaginationItem>
//       </PaginationContent>
//     </Pagination>
//   );
// };
