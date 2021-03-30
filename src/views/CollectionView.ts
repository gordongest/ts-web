import { Collection } from '../models/Collection';
import { User, UserProps } from '../models/User';

export abstract class CollectionView {
  constructor(public parent: Element, public collection: Collection<User, UserProps> ) {}

}