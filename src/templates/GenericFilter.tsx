import { Fragment } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

type GenericFilterProps = {
  filterName: string;
  filterValues: { name: string; type: number }[];
  filterType: (string | undefined)[];
  setFilterType: Function;
  // filterStates: { type: number; name: string; unavailable: boolean }[];
};

// type FilterItems = {
//   name: string;
//   type: number;
// }[];

// const initialItems = [{ name: '', type: 0 }];

export default function GenericFilter(props: GenericFilterProps) {
  // const [selected, setSelected] = useState(sortState[0]);

  // const [filterType, setFilterType] = useState(initialItems[0]);

  // async function getFilterValues(filterName: String) {
  //   // Extract the nested arrays from the filtered array

  //   try {
  //     const allMeta = await getAllMeta();
  //     // console.log(allMeta.data);
  //     const extractedArrays = allMeta.data.map(
  //       (parentObject: any) => parentObject.data.attributes
  //     );

  //     const flattenedArray = extractedArrays.flat();

  //     // Filter the parent array by a value in the nested array
  //     const filteredArray = flattenedArray.filter(
  //       (parentObject: any) => parentObject.trait_type === filterName
  //     );
  //     console.log(filteredArray);
  //     // // Use Array.filter() and Set to return only the unique values
  //     const distinctValues = Array.from(
  //       new Set(filteredArray.map((object: any) => object.value))
  //     );
  //     const newItems = distinctValues.map((str: string, index) => {
  //       return {
  //         type: index,
  //         name: str,
  //       };
  //     });
  //     // initialItems = distinctValues.reduce((obj, str, index) => {
  //     //   obj.name = str;
  //     //   obj.type = index;
  //     //   // obj[]
  //     //   return obj;
  //     // }, {});
  //     console.log(newItems);
  //     return newItems;
  //     // return allMeta.data;
  //   } catch (err) {
  //     console.log(err);
  //     return null;
  //   }
  // }

  // useEffect(() => {
  //   // const promise = getFilterValues('Type');
  //   // promise.then((data) => {
  //   //   console.log(data);
  //   //   initialItems = data;
  //   // });
  //   const promise3 = getFilteredMeta('filterName=Type&distinct=true');
  //   promise3.then((data2) => {
  //     const newItems = data2.data.map(
  //       (obj: { _id: { value: string } }, index: number) => {
  //         return {
  //           type: index,
  //           // eslint-disable-next-line no-underscore-dangle
  //           name: obj._id.value,
  //         };
  //       }
  //     );
  //     console.log(newItems);
  //     initialItems = newItems;
  //   });
  // }, []);

  return (
    <div className="w-60">
      <Listbox
        value={props.filterType}
        onChange={(e) => {
          props.setFilterType(e);
        }}
        multiple
      >
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
            <span className="block ">{props.filterName}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {props.filterValues.map((filter) => (
                <Listbox.Option
                  key={filter.type}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={filter.name}
                  // disabled={filterType.unavailable}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {filter.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
