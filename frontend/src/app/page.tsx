/** @format */

import { Button } from '@/components/ui/button';
import {
	getBooksOnSale,
	getBooks,
	getBooksOnAnalysis,
} from '../services/book.service';
import AppContainer from '@/components/app-container';
import { Card, CardContent } from '@/components/ui/card';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import BookCard from '@/components/book-card';

export default async function Home() {
	const [saleBooks, popolarBooks, recomendBooks] = await Promise.all([
		getBooksOnSale({ page: 0, limit: 5 }),
		getBooksOnAnalysis({ page: 0, limit: 20, sort: 'totalOrderQuantity' }),
		getBooksOnAnalysis({ page: 0, limit: 20, sort: 'avarageRating' }),
	]);

	return (
		<main className="py-16">
			<AppContainer>
				<section className="w-full mb-28">
					<div className="flex justify-between items-center mb-2">
						<h3 className="text-xl">On Sale</h3>
						<Button>View All</Button>
					</div>
					<Card>
						<CardContent className="py-6 px-20">
							<Carousel opts={{ align: 'start' }}>
								<CarouselContent className="-ml-4">
									{saleBooks.map((book) => (
										<CarouselItem key={book.id} className="basis-1/4 pl-4">
											<BookCard book={book} />
										</CarouselItem>
									))}
								</CarouselContent>
								<CarouselPrevious />
								<CarouselNext />
							</Carousel>
						</CardContent>
					</Card>
				</section>

				<section>
					<div>
						<h3 className="text-xl text-center mb-3">Featured Books</h3>
						<Tabs defaultValue="popular" className="w-full">
							<div className="flex justify-around">
								<TabsList>
									<TabsTrigger value="popular">Popular</TabsTrigger>
									<TabsTrigger value="recommend">Recommend</TabsTrigger>
								</TabsList>
							</div>
							<TabsContent value="popular">
								<Card>
									<CardContent className="py-6 px-20">
										<div className="grid grid-cols-5 gap-4">
											{popolarBooks.map((book) => (
												<BookCard key={book.id} book={book} />
											))}
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent value="recommend">
								<Card>
									<CardContent className="py-6 px-20">
										<div className="grid grid-cols-5 gap-4">
											{recomendBooks.map((book) => (
												<BookCard key={book.id} book={book} />
											))}
										</div>
									</CardContent>
								</Card>
							</TabsContent>
						</Tabs>
					</div>
				</section>
			</AppContainer>
		</main>
	);
}
