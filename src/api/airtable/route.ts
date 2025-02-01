import { NextResponse } from "next/server";
import Airtable from "airtable";

export async function GET() {

    if (!process.env.AIRTABLE_TOKEN || !process.env.AIRTABLE_TOKEN_ID) {
        return NextResponse.json({ error: "Missing Airtable credentials" }, { status: 400 });
    }

    try {
        const base = new Airtable({
            apiKey: process.env.AIRTABLE_TOKEN
        }).base(process.env.AIRTABLE_TOKEN_ID);

        const records = await base("Job").select({ view: "Grid view" }).all();
        const jobs = records.map(record => ({
            id: record.id,
            name: record.get("Name")
        }));

        return NextResponse.json({ success: true, data: jobs });
    } catch (error) {
        console.error("Airtable Fetch Error:", error);
        return NextResponse.json({ error: "Failed to fetch data from Airtable" }, { status: 500 });
    }
}
