import { Button, SelectBox, SelectBoxItem } from "@tremor/react";
import Link from "next/link";
import React from "react";
import Router from "next/router";

function Navbar() {
  function selectHandler(value: number) {
    switch (value) {
      case 1:
        Router.push("/coins/bitcoin");
        break;
      case 2:
        Router.push("/coins/ethereum");
        break;
      case 3:
        Router.push("/coins/tether");
        break;
      case 4:
        Router.push("/coins/monero");
        break;
      case 5:
        Router.push("/coins/dogecoin");
        break;
    default: return;
    }
  }
  return (
    <div className="mx-auto max-w-7xl flex justify-between">
      <Link href={"/coins/bitcoin"}>
        <Button>Bitcoin!</Button>
      </Link>
      <SelectBox
        onValueChange={selectHandler}
        maxWidth="max-w-sm"
        placeholder="Search..."
      >
        <SelectBoxItem value={1} text="Bitcoin" />
        <SelectBoxItem value={2} text="Ethereum" />
        <SelectBoxItem value={3} text="Tether" />
        <SelectBoxItem value={4} text="Monero" />
        <SelectBoxItem value={5} text="Dogecoin" />
        
      </SelectBox>
      <Link href={"/coins/solana"}>
        <Button>Start now.</Button>
      </Link>
    </div>
  );
}

export default Navbar;
