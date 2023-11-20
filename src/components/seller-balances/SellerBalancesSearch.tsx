import React from "react";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";

interface SellerBalancesSearchProps {
  onChange: () => void;
  searchQuery: string;
}

const SellerBalancesSearch: React.FC<SellerBalancesSearchProps> = ({
  onChange,
  searchQuery,
}) => (
  <Card sx={{ p: 2 }}>
    <OutlinedInput
      onChange={onChange}
      defaultValue=""
      fullWidth
      placeholder="Search a seller balance..."
      startAdornment={
        <InputAdornment position="start">
          <SvgIcon color="action" fontSize="small">
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      }
      sx={{ maxWidth: 500 }}
      value={searchQuery}
    />
  </Card>
);

export default SellerBalancesSearch;
