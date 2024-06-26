/** @format */

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	TypographyH3,
	TypographyH5,
	TypographyH6,
	TypographyMuted,
	TypographyP,
	TypographySmall,
} from '@/components/ui/typography';
import { IBook, IReview, IReviewExtend } from '@/interfaces/book.interface';

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';

interface Props {
	book: IBook;
	reviews: IReviewExtend;
}

export default function ReviewList({ book, reviews }: Props) {

	function findCount(rating: number) {
		const count = reviews.count.find(count => count.rating === rating)
		return count?._count || 0;
	}

	return (
		<Card>
			<CardHeader className="py-4">
				<TypographyH6>Customer Review</TypographyH6>
			</CardHeader>
			<CardContent>
				<div className="flex gap-4">
					<div>
						<TypographyH3>{Math.round(reviews.avarageRating * 10) / 10}</TypographyH3>
						<TypographyMuted>[{reviews.totalReview}]</TypographyMuted>
					</div>
					<div>
						<TypographyH3>Star</TypographyH3>
						<div className="flex h-5 items-center space-x-2">
							<TypographyMuted>5 star ({findCount(5)})</TypographyMuted>
							<Separator orientation="vertical" />
							<TypographyMuted>4 star ({findCount(4)})</TypographyMuted>
							<Separator orientation="vertical" />
							<TypographyMuted>3 star ({findCount(3)})</TypographyMuted>
							<Separator orientation="vertical" />
							<TypographyMuted>2 star ({findCount(2)})</TypographyMuted>
							<Separator orientation="vertical" />
							<TypographyMuted>1 star ({findCount(1)})</TypographyMuted>
						</div>
					</div>
				</div>

				<div className="flex justify-between items-star mt-4">
					<TypographySmall className="text-xs">
						Showing 1-12 of 150 reviews
					</TypographySmall>
					<div className="flex gap-4">
						<Button>Sort by on sale</Button>
						<Button>Show 20</Button>
					</div>
				</div>

				<div className="my-4">
					{reviews.reviews.map((review) => (
						<>
							<Review review={review} />
							<Separator className="my-4" />
						</>
					))}
				</div>

				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious size="default" href="#" />
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#">1</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#" isActive>
								2
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#">3</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationNext size="default" href="#" />
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</CardContent>
		</Card>
	);
}

type ReviewProps = {
	review: IReview;
};

function Review({ review }: ReviewProps) {
	return (
		<div>
			<div className="flex items-center h-5 space-x-2">
				<TypographyH5>{review.title}</TypographyH5>
				<Separator orientation="vertical" />
				<TypographyMuted>{review.rating} star</TypographyMuted>
			</div>
			<TypographyP className="text-sm">{review.content}</TypographyP>
			<TypographyP className="text-slate-600 text-sm">
				{review.createdAt.split('T')[0]}
			</TypographyP>
		</div>
	);
}
