import { FormEventHandler } from 'react';

import { SearchIcon } from '@chakra-ui/icons';
import { Input, IconButton, InputGroup } from '@chakra-ui/react';

type INftProps = {
  query: string | ReadonlyArray<string> | number | undefined;
  handleSubmit: FormEventHandler;
  setQuery: Function;
};

const SearchBox = (props: INftProps) => {
  return (
    <form onSubmit={props.handleSubmit} className="search rounded">
      <InputGroup pb="1rem">
        <Input
          placeholder="Search for Daturian ID"
          variant="ghost"
          value={props.query}
          onChange={(e) => props.setQuery(e.target.value)}
        />
        <IconButton
          aria-label="Search"
          icon={<SearchIcon />}
          onClick={props.handleSubmit}
          bg="black"
          color="white"
        />
      </InputGroup>
    </form>
  );
};

export default SearchBox;
