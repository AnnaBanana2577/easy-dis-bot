function getArgumentsFromString(input) {
  var elements = input.split(/([^\"]\S*|\".+?\")\s*/),
    matches = [];
  for (index in elements) {
    if (elements[index].length > 0) {
      if (elements[index].charAt(0) === '"') {
        matches.push(elements[index].substring(1, elements[index].length - 1));
      } else {
        matches.push(elements[index]);
      }
    }
  }
  return matches;
}

export default function commandHandler() {}
