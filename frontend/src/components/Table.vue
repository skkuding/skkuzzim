<script setup lang="ts">
import { useNow } from "@vueuse/core";
import { COLOR, FONT_SIZE } from "@/styles/theme";
interface TimeRange {
  startTime: {
    hour: number;
    minute: number;
  };
  endTime: {
    hour: number;
    minute: number;
  };
}

const props = defineProps<{
  dates: Date[];
}>();

// row header
const DAYS = ["월", "화", "수", "목", "금", "토", "일"];
// column header
const TIMES = Array<TimeRange>(30)
  .fill({
    startTime: {
      hour: 9,
      minute: 0,
    },
    endTime: {
      hour: 9,
      minute: 30,
    },
  })
  .map((item, index) => {
    const newStartTime =
      item.startTime.hour * 60 + item.startTime.minute + index * 30;
    const newEndTime = newStartTime + 30;
    return {
      startTime: {
        hour: Math.floor(newStartTime / 60),
        minute: newStartTime % 60,
      },
      endTime: {
        hour: Math.floor(newEndTime / 60),
        minute: newEndTime % 60,
      },
    };
  });

// 현재 날짜 및 시각
const now = useNow();
const isCurrentTime = ({ startTime, endTime }: TimeRange) => {
  let isTodayIncluded = false;
  for (let i = 0; i < props.dates.length; i++) {
    if (isSameDate(props.dates[i], now.value)) {
      isTodayIncluded = true;
      break;
    }
  }
  if (isTodayIncluded) {
    if (
      startTime.hour === now.value.getHours() &&
      startTime.minute <= now.value.getMinutes()
    ) {
      if (endTime.minute === 0) return true;
      if (now.value.getMinutes() <= endTime.minute - 1) return true;
      return false;
    }
    return false;
  }
  return false;
};
const isSameDate = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
const getDateString = (date: Date, time: { hour: number; minute: number }) => {
  const datetime = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.hour,
    time.minute,
    0,
    0
  );
  return new Date(
    datetime.getTime() - datetime.getTimezoneOffset() * 60000
  ).toJSON();
};
</script>

<template>
  <table>
    <thead>
      <tr>
        <th></th>
        <th v-for="(date, index) in dates" :key="index" class="row">
          <span
            :class="
              isSameDate(now, date)
                ? 'today'
                : index === dates.length - 1
                ? 'sun'
                : index === dates.length - 2
                ? 'sat'
                : ''
            "
          >
            <span class="day">{{ DAYS[index] }}</span>
            <span class="date">{{ date.getDate() }}</span>
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="({ startTime, endTime }, index) in TIMES" :key="index">
        <th class="column">
          <span :class="isCurrentTime({ startTime, endTime }) ? 'today' : ''">
            {{ startTime.hour }}:{{
              startTime.minute.toString().padStart(2, "0")
            }}~{{ endTime.hour }}:{{
              endTime.minute.toString().padStart(2, "0")
            }}
          </span>
        </th>
        <td v-for="(date, index) in dates" :key="index">
          <slot :name="getDateString(date, startTime)"></slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  font-size: v-bind("FONT_SIZE.content");
  border-spacing: 0;
}
.today {
  padding: 9px 5px;
  color: white;
  border-radius: 12px;
  background-color: v-bind("COLOR.yellow");
}
th.row .today {
  max-width: 64px;
  margin: 0 auto;
}
th.column .today {
  padding: 4px 6px;
}
.sat {
  color: v-bind("COLOR.blue");
}
.sun {
  color: v-bind("COLOR.red");
}
.date {
  font-weight: bold;
  font-size: v-bind("FONT_SIZE.content");
}
.day {
  font-weight: bold;
}
td,
th {
  min-width: 138px;
  height: 44px;
  padding: 0;
  border-bottom: 1px solid v-bind("COLOR['light-gray']");
  border-right: 1px solid v-bind("COLOR['light-gray']");
  text-align: center;
}
td:last-child,
th:last-child {
  border-right: none;
}
th.row {
  padding: 5px;
}
th.row > span {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 4px;
  font-size: v-bind("FONT_SIZE.title");
  font-weight: bold;
}
</style>
