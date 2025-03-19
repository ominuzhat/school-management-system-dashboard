type migrateClass = {
  id: number;
  migrate_id: number;
};

export interface IResultMigration {
  exam: number;
  grade_levels: migrateClass[];
  session: number;
}
