type Dimensions = {
  width: number | string
  height: number | string
  length: number | string
  mass: number | string
}

// NOTE: consider changing to 
// function sort(dimensions: Dimensions) so that we can just inject the dependencies/measurements as needed
function sort(width: number | string, height: number | string, length: number | string, mass: number | string): string {
  // we're implicitly casting the numbers so we can use strings
  const is_bulky = check_if_bulky(Number(width), Number(height), Number(length))
  const is_heavy = check_if_heavy(Number(mass))

  // Use escape clauses so we can just add any adjustments to what needs to be reported
  if (is_heavy && is_bulky) {
    return 'REJECTED' // might be better to store this in a TYPES object 
  }

  if (is_heavy || is_bulky) {
    return 'SPECIAL'
  }

  return 'STANDARD';
}

// return whether or not package meets bulky status
function check_if_bulky(width: number, height: number, length: number): boolean {

  const bulk = width * height * length;
  let bulky_status = false;

  if (bulk > 1000000 || (width >= 150) || (height >= 150) || (length >= 150)) {
    bulky_status = true
  }

  return bulky_status;
}

// return whether or not package meets heavy status
function check_if_heavy(mass: number): boolean {
  return mass >= 20
}

// simple test cases below
let tests = [
  {
    name: 'package1',
    dimensions: {
      width: 100,
      height: 150,
      length: 30,
      mass: 5
    }
  },
  {
    name: 'package2',
    dimensions: {
      width: 90,
      height: 120,
      length: 30,
      mass: 5

    }
  },
  {
    name: 'package3',
    dimensions: {
      width: '90',
      height: 120,
      length: 30,
      mass: 5
    }
  },
  {
    name: 'package4',
    dimensions: {
      width: 90,
      height: 120,
      length: 30,
      mass: 25
    }
  },
  {
    name: 'package5',
    dimensions: {
      width: 350000,
      height: 350000,
      length: 350000,
      mass: 25
    }
  }
]

for (let package_to_sort of tests) {
  let { width, height, length, mass } = package_to_sort.dimensions
  let where_to_sort = sort(width, height, length, mass)

  console.log(`package: ${package_to_sort.name} is going to ${where_to_sort}`)
}
