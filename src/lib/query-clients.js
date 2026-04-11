// Central demo events array for use everywhere
export const demoEvents = [
	{
		id: 1,
		title: "Jazz & Cocktails Evening",
		genre: "Jazz",
		venue_name: "The Botanical Bar",
		date: "2026-03-29",
		time: "20:00",
		image_url: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=600&q=80",
		status: "upcoming",
		description: "A night of smooth jazz and signature cocktails at The Botanical Bar."
	},
	{
		id: 2,
		title: "House Party",
		genre: "House",
		venue_name: "Velvet Lounge",
		date: "2026-04-02",
		time: "22:00",
		image_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80",
		status: "upcoming",
		description: "Dance all night to the best house music in town!"
	},
	{
		id: 3,
		title: "Amapiano Night",
		genre: "Amapiano",
		venue_name: "Club Nova",
		date: "2026-04-05",
		time: "21:00",
		image_url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80",
		status: "upcoming",
		description: "Experience the hottest Amapiano tracks with live DJs."
	},
	{
		id: 4,
		title: "Hip Hop Bash",
		genre: "Hip Hop",
		venue_name: "Jazz Bar",
		date: "2026-04-08",
		time: "20:30",
		image_url: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600&q=80",
		status: "upcoming",
		description: "Hip hop artists and DJs take over the Jazz Bar."
	},
	{
		id: 5,
		title: "RnB Vibes",
		genre: "R&B",
		venue_name: "Velvet Lounge",
		date: "2026-04-12",
		time: "19:00",
		image_url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600&q=80",
		status: "upcoming",
		description: "Smooth R&B and chill vibes all night."
	},
	{
		id: 6,
		title: "Live DJ Set",
		genre: "House",
		venue_name: "Club Nova",
		date: "2026-04-15",
		time: "23:00",
		image_url: "https://images.unsplash.com/photo-1465101178521-c1a9136a3c8b?w=600&q=80",
		status: "live",
		description: "Don't miss the hottest DJ set of the month!"
	},
	{
		id: 7,
		title: "VIP Night",
		genre: "Jazz",
		venue_name: "The Botanical Bar",
		date: "2026-04-20",
		time: "20:00",
		image_url: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=600&q=80",
		status: "sold_out",
		description: "Exclusive VIP event. Tickets sold out!"
	},
	{
		id: 8,
		title: "Live Performances Night",
		genre: "Live Performances",
		venue_name: "Velvet Lounge",
		date: "2026-04-18",
		time: "21:00",
		image_url: "https://images.unsplash.com/photo-1503676382389-4809596d5290?w=600&q=80",
		status: "upcoming",
		description: "Enjoy live performances from top local artists."
	},
	{
		id: 9,
		title: "Afrobeats Explosion",
		genre: "Afrobeats",
		venue_name: "Club Nova",
		date: "2026-04-22",
		time: "22:30",
		image_url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600&q=80",
		status: "upcoming",
		description: "Feel the rhythm with the best Afrobeats DJs in the city!"
	},
	{
		id: 10,
		title: "Techno Takeover",
		genre: "Techno",
		venue_name: "Velvet Lounge",
		date: "2026-04-25",
		time: "23:30",
		image_url: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600&q=80",
		status: "upcoming",
		description: "A night of relentless techno beats and lights."
	},
	{
		id: 11,
		title: "Old School Jam",
		genre: "Hip Hop",
		venue_name: "Jazz Bar",
		date: "2026-04-28",
		time: "20:00",
		image_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80",
		status: "upcoming",
		description: "Throwback night with classic hip hop and R&B."
	},
	{
		id: 12,
		title: "Sunset Sessions",
		genre: "Jazz",
		venue_name: "The Botanical Bar",
		date: "2026-05-01",
		time: "18:00",
		image_url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80",
		status: "upcoming",
		description: "Chill jazz and cocktails as the sun goes down."
	},
];
import { QueryClient } from '@tanstack/react-query';


export const queryClientInstance = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 1,
		},
	},
});