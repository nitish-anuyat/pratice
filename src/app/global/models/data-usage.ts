export interface DataUsage {
    total_data_size_in_MB: number;
    used_data_size_in_MB: number;
    remaining_data_in_MB: number;
    end_date?: Date;
}