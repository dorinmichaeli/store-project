export async function searchItems(modelService, searchQuery) {
  // 1. Escape special characters in the search query.
  const escapedQuery = escapeRegExp(searchQuery);
  // 2. Split the search query into words.
  // This splits the query by whitespace, but also makes sure that multiple
  // whitespaces are treated as a single one, so that a query with
  // consecutive whitespace characters won't create an empty string in the
  // array which would match everything.
  //
  // "tv fridge       hello" -> ["tv", "fridge", "hello"]
  const words = escapedQuery.split(/\s+/);
  // 3. Create a regular expression that matches any of the words.
  //
  // ["tv", "fridge", "hello"] -> "tv|fridge|hello"
  const regex = words.join('|');

  // 4. Search for items that match the regular expression.
  // Note that we use the 'i' flag to make the search case-insensitive.
  // Also note that we use the $or operator, and search for the query in
  // the "name", "description", "tags", and "manufacturer" of the items.
  return await modelService.itemModel.find({
    $or: [
      {
        name: {$regex: regex, $options: 'i'},
      },
      {
        description: {$regex: regex, $options: 'i'},
      },
      {
        tags: {$regex: regex, $options: 'i'},
      },
      {
        manufacturer: {$regex: regex, $options: 'i'},
      },
    ],
  });
}

export async function getItemDetails(modelService, itemId) {
  // Find the item with the given id.
  return await modelService.itemModel.findOne({_id: itemId});
}

function escapeRegExp(string) {
  // See: https://stackoverflow.com/a/6969486/940723
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
