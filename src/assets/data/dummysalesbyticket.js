const salesbyticket = {
  header: ["Ticket type", "Price", "Sold"],
  Report: [
    {
      ticketType: "Paid ticket 1",
      Price: 12,
      sold: 12,
      total: 60,
    },
    {
      ticketType: "Paid ticket 2",
      Price: 21,
      sold: 12,
      total: 60,
    },
    {
      ticketType: "Free ticket 1",
      Price: "free",
      sold: 21,
      total: 60,
    },
  ],
  pagination: {
    totalTickets: 3,
    totalPages: 1,
    currentPage: 1,
    nextPage: null,
    prevPage: null,
  },
};

export default salesbyticket;
