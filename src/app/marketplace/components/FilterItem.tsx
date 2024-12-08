"use client";
import { Collapse } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface FilterItemProps {
  title: string;
  children: React.ReactNode;
}

const FilterItem = ({ title, children }: FilterItemProps) => {
  return (
    <Collapse
      bordered={false}
      defaultActiveKey={["1"]}
      expandIcon={({ isActive }) => (
        <FontAwesomeIcon
          icon={faChevronRight}
          style={{
            transform: isActive ? "rotate(90deg)" : "rotate(0deg)",
          }}
        />
      )}
      items={[
        {
          key: "1",
          label: title,
          children: children,
        },
      ]}
    />
  );
};

export default FilterItem;
