import * as React from "react";
import { ScrollView } from "react-native";
import { Activity } from "./Activity";
import Utils from "../constants/Utils";
export default function Filter(props: any) {
  if (props.filter.isDone) {
    return (
      <ScrollView>
        {props.data.map((item: any) => {
          if (props.list[item].isDone) {
            return (
              <Activity key={item} types="success">
                {props.list[item].activity}
              </Activity>
            );
          }
        })}
      </ScrollView>
    );
  } else {
    return (
      <ScrollView>
        {props.data.map((item: any) => {
          if (!props.list[item].isDone) {
            return (
              <Activity
                key={item}
                checkFunc={() => Utils.UpdateCheckItems(item, props.list)}
                types="process"
                updateState={props.setUpdateActivity}
                updateFunc={() =>
                  Utils.UpdateItems(item, props.list, props.updateActivity)
                }
                deleteFunc={() => Utils.DeleteItems(item, props.list)}
              >
                {props.list[item].activity}
              </Activity>
            );
          }
        })}
      </ScrollView>
    );
  }
}
