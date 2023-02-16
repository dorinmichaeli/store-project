export async function getAllOrdersFromAllUsers(modelService) {
  return await modelService.orderModel.find();
}

export async function getOrderCountPerDayLast14Days(modelService, {daysBack}) {
  // Get the date X days ago. We'll use this as the lower
  // bound for the query to limit which orders are counted.
  const lowerBound = new Date();
  lowerBound.setDate(lowerBound.getDate() - daysBack);

  // Aggregate the orders by day and count how many orders are in each group.
  const results = await modelService.orderModel.aggregate([
    {
      $match: {
        // Only count orders that are newer than 14 days ago.
        date: {$gte: lowerBound},
      },
    },
    {
      $group: {
        // Group orders by day.
        _id: {
          // Convert the date to a string as a way to truncate it to the day.
          $dateToString: {format: "%Y-%m-%d", date: "$date"},
        },
        // Count how many orders are in each group.
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  // Rename the properties to be more descriptive.
  const renamedResults = results.map(entry => {
    return {
      date: entry._id,
      orderCount: entry.count,
    };
  });

  // Fill in empty days with 0 order counts.
  // This can probably be done within the mongodb query, but I'm not sure how.
  const filledResults = [];
  for (let i = 0; i < daysBack; i++) {
    // The date we're working on in this iteration.
    const date = new Date();
    date.setDate(date.getDate() - i);
    // The date of the current day as a string.
    const dateString = date.toISOString().split('T')[0];
    // Check if the current day has any orders and already has an entry.
    let entry = renamedResults.find(entry => entry.date === dateString);
    if (!entry) {
      // If the current day has no orders, create an entry with 0 order count.
      entry = {
        date: dateString,
        orderCount: 0,
      };
    }
    // Add the entry to the filled results.
    filledResults.push(entry);
  }

  // Sort the results by date.
  filledResults.sort((a, b) => {
    // The dates are strings, so we can use localeCompare to sort them.
    // This always works because the parts of the date strings are 0-padded
    // (except the year part, but that's not really a problem).
    return a.date.localeCompare(b.date);
  });

  return filledResults;
}

export async function getAllOrdersOfUser(modelService, userId) {
  return await modelService.orderModel.find({
    userId: userId,
  });
}
