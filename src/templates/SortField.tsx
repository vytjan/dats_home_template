import { Fragment } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

type FilterProps = {
  sortType: { type: Number; name: String; unavailable: boolean };
  setSortType: Function;
  sortStates: { type: Number; name: String; unavailable: boolean }[];
};

export default function SortFilter(props: FilterProps) {
  // const [selected, setSelected] = useState(sortState[0]);

  return (
    <div className="w-60">
      <Listbox
        value={props.sortType}
        onChange={(e) => {
          // console.log(e);
          props.setSortType(e);
        }}
      >
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-secondary-100 text-blue py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
            <span className="block ">{props.sortType.name}</span>
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
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-secondary-100 text-blue py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {props.sortStates.map((sortType, sortTypeIdx) => (
                <Listbox.Option
                  key={sortTypeIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-blue-100 text-blue' : 'text-gray-500'
                    }`
                  }
                  value={sortType}
                  disabled={sortType.unavailable}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {sortType.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue">
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
