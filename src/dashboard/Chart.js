import React from "react";
import {useTheme} from "@material-ui/core/styles";
import {Label, Line, LineChart, ResponsiveContainer, XAxis, YAxis,} from "recharts";
import Title from "./Title";
import moment from 'moment';

export default function Chart({data, typeLine, name, color}) {
    const theme = useTheme();

    return (
        <React.Fragment>
            <Title>{name}</Title>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis dataKey="timestamp" tickFormatter={(tick) => moment(tick).format('YYYY-MM-DD')}
                           stroke={theme.palette.text.secondary} interval={0}/>
                    <YAxis stroke={theme.palette.text.secondary}>
                        <Label
                            angle={270}
                            position="left"
                            style={{textAnchor: "middle", fill: theme.palette.text.primary}}
                        >
                            Size (cm)
                        </Label>
                    </YAxis>
                    <Line
                        type="monotone"
                        dataKey={typeLine}
                        stroke={color}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}
