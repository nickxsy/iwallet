export type CategoryId = Brand<UniqId, 'CategoryId'>;
export type CategoryName = Brand<string, 'CategoryName'>;

export type Category = {
  id: CategoryId;
  name: CategoryName;
};
